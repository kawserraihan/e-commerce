from rest_framework import viewsets, permissions, status
from rest_framework.viewsets import ModelViewSet

from .models import Product, ProductImage, UserOrder, ProductVariant, WholesalePrice, Cart, CartItem
from users.models import SellerProfile, DealerProfile

from .serializers import ProductSerializer, ProductImageSerializer, ProductVariantSerializer, WholesalePriceSerializer, UserOrderSerializer, CartSerializer, CartItemSerializer

from rest_framework_simplejwt.authentication import JWTAuthentication
from users.authentication import CustomJwtAuthentication

from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Sum, Count
from django.db.models.functions import TruncMonth
from django.utils import timezone

from django.db import transaction
from django.shortcuts import get_object_or_404

from rest_framework.exceptions import ValidationError  

from django.utils.timezone import now
from datetime import timedelta

#----------------------------------------Imports For Public Use--------------------------------

from .serializers import ProductVariantPublicSerializer, ProductPublicSerializer, WholesalePricePublicSerializer, ProductImagePublicSerializer, StoreProfileSerializer, ProductByStoreSerializer


import logging

logger = logging.getLogger(__name__)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser, JSONParser) 


class ProductVariantViewSet(ModelViewSet):
    """
    API for managing product variants.
    """
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'], url_path='(?P<product_id>[^/.]+)')
    def list_of_variants(self, request, product_id=None):
        """
        Custom action to retrieve variants for a specific product by product_id.
        """
        variants = self.queryset.filter(product_id=product_id)
        page = self.paginate_queryset(variants)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(variants, many=True)
        return Response(serializer.data)

class WholesalePriceViewSet(ModelViewSet):
    """
    API for managing wholesale prices.
    """
    queryset = WholesalePrice.objects.all()
    serializer_class = WholesalePriceSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'], url_path='(?P<product_id>[^/.]+)')
    def list_wholesale_price(self, request, product_id=None):
        """
        Custom action to retrieve prices for a specific product by product_id.
        """
        prices = self.queryset.filter(product_id=product_id)
        page = self.paginate_queryset(prices)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(prices, many=True)
        return Response(serializer.data)


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)
    

    @action(detail=False, methods=['get'], url_path='(?P<product_id>[^/.]+)')
    def list_product_images(self, request, product_id=None):
        """
        Custom action to retrieve images for a specific product by product_id.
        """
        images = self.queryset.filter(product_id=product_id)
        page = self.paginate_queryset(images)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)
    
    

class UserOrderViewSet(viewsets.ModelViewSet):
    queryset = UserOrder.objects.all()
    serializer_class = UserOrderSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

    def perform_create(self, serializer):
        print("perform_create called")  # Debug
        if not self.request.user.is_authenticated:
            print("Error: User must be authenticated to create an order.")
            raise ValidationError("User must be authenticated.")
        
        print(f"Attaching user {self.request.user} to the order.")  # Debug
        order = serializer.save(user=self.request.user)
        # Calculate total_amount based on related order items
        total_amount = sum(item.total_price for item in order.items.all())
        order.total_amount = total_amount
        order.save()  # Save the order with the updated total_amount

    def create(self, request, *args, **kwargs):
        print("Received order creation request with data:", request.data)  # Debug 
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            print("Data is valid, attempting to save order.")  # Debug 
            self.perform_create(serializer)
            print("Order created successfully.")  # Debug 

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            print("Order creation failed due to invalid data:", serializer.errors)  # Debug 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductStockUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        # debugging
        logger.debug(f"Received patch request for product ID {pk} with data: {request.data}")

        try:
            product = Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            logger.error("Product not found")
            return Response({"error": "Product not found"}, status=status.HTTP_404_NOT_FOUND)

        new_stock_quantity = request.data.get("quantity")
        if new_stock_quantity is None:
            logger.error("New stock quantity not provided")
            return Response({"error": "New stock quantity not provided"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_stock_quantity = int(new_stock_quantity)
        except ValueError:
            logger.error("Quantity must be an integer")
            return Response({"error": "Quantity must be an integer"}, status=status.HTTP_400_BAD_REQUEST)

        if new_stock_quantity < 0:
            logger.error("Quantity cannot be negative")
            return Response({"error": "Quantity cannot be negative"}, status=status.HTTP_400_BAD_REQUEST)

        product.stock_quantity = new_stock_quantity
        product.save()
        logger.debug(f"Updated product {product.id} stock quantity to {product.stock_quantity}")

        return Response({"new_stock_quantity": product.stock_quantity}, status=status.HTTP_200_OK)
    


#--------------------------------------CART----------------------------------


class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    lookup_field = 'user_id'

    def get_queryset(self):
        return Cart.objects.all()

    @action(detail=True, methods=['POST'])
    def items(self, request, user_id=None):
        """Add item to cart"""
        cart = get_object_or_404(Cart, user_id=user_id)
        
    
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)
        
        if not product_id:
            return Response(
                {"detail": "product_id is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
 
        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={'quantity': quantity}
        )
        
 
        if not created:
            cart_item.quantity = quantity
            cart_item.save()
        
        serializer = CartItemSerializer(cart_item)
        return Response(
            serializer.data, 
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )

    @action(detail=True, methods=['DELETE'], url_path=r'remove_item/(?P<item_id>\d+)')
    def remove_item(self, request, user_id=None, item_id=None):
        """Remove item from cart using item_id directly from the URL"""
        cart = get_object_or_404(Cart, user_id=user_id)
        cart_item = get_object_or_404(CartItem, cart=cart, id=item_id)
        cart_item.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @action(detail=True, methods=['PATCH'], url_path='update-item')
    def update_item_quantity(self, request, user_id=None):
        """Update quantity of a cart item"""
        cart = get_object_or_404(Cart, user_id=user_id)
        item_id = request.data.get('item_id')
        quantity = request.data.get('quantity')

        if not item_id or quantity is None:
            return Response(
                {"detail": "item_id and quantity are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        cart_item = get_object_or_404(CartItem, cart=cart, id=item_id)
        cart_item.quantity = quantity
        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_200_OK)
    





class MergeCartView(APIView):
    """
    Merge session-based cart with the authenticated user's cart.
    """

    def post(self, request):
        user = request.user
        session_cart = request.data.get("cart", [])
        if not user.is_authenticated:
            return Response({"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)

        try:
            # Retrieve or create user's cart
            cart, created = Cart.objects.get_or_create(user=user)

            for item in session_cart:
                product_id = item.get("productId")
                quantity = item.get("quantity", 1)

                # Ensure product exists
                product = Product.objects.filter(id=product_id).first()
                if not product:
                    continue

                # Add or update cart item
                cart_item, created = CartItem.objects.get_or_create(
                    cart=cart,
                    product=product,
                    defaults={"quantity": quantity},
                )
                if not created:
                    cart_item.quantity += quantity
                    cart_item.save()

            return Response({"message": "Cart merged successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

        
    



#----------------------------------------------------------------Private END--------------------------------------------------------

#----------------------------------------------------------------Publc Start-----------------------------------------------------------


class ProductPublicViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductPublicSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination
    authentication_classes = []
    lookup_field = 'slug'  # Use slug for lookups

    def get_queryset(self):
        """
        Optionally filter active products or add any custom queryset logic.
        """
        return super().get_queryset().filter(is_active=True)

    def get_object(self):
        """
        Debugging lookup for slug-based filtering.
        """
        print("Lookup kwargs:", self.kwargs)  # Check what slug is being passed
        queryset = self.filter_queryset(self.get_queryset())
        obj = get_object_or_404(queryset, slug=self.kwargs['slug'])
        return obj
    

class WholesalePricePublicViewSet(ModelViewSet):

    queryset = WholesalePrice.objects.all()
    serializer_class = WholesalePricePublicSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'], url_path='(?P<product_id>[^/.]+)')
    def list_wholesale_price(self, request, product_id=None):

        prices = self.queryset.filter(product_id=product_id)
        page = self.paginate_queryset(prices)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(prices, many=True)
        return Response(serializer.data)

class ProductVariantPublicViewSet(ModelViewSet):

    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantPublicSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=isinstance(request.data, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()

    @action(detail=False, methods=['get'], url_path='(?P<product_id>[^/.]+)')
    def list_of_variants(self, request, product_id=None):

        variants = self.queryset.filter(product_id=product_id)
        page = self.paginate_queryset(variants)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(variants, many=True)
        return Response(serializer.data)
    


    
class ProductImagePublicViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImagePublicSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = []
    

    @action(detail=False, methods=['get'], url_path='(?P<product_id>[^/.]+)')
    def list_product_images(self, request, product_id=None):

        images = self.queryset.filter(product_id=product_id)
        page = self.paginate_queryset(images)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(images, many=True)
        return Response(serializer.data)
    


#-----------------------------------------------Store--------------------------------------------



class StoreProfileView(APIView):

    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination
    authentication_classes = []
    def get(self, request):
        try:
      
            seller_profiles = SellerProfile.objects.select_related('user').all()
            dealer_profiles = DealerProfile.objects.select_related('user').all()

        
            combined_stores = []
            
            for seller in seller_profiles:
                combined_stores.append({
                    'user_id': seller.user.id,
                    'name': seller.store_name,
                    'type': 'seller',
                    'email': seller.store_email,
                    'status': seller.status
                })
            
            for dealer in dealer_profiles:
                combined_stores.append({
                    'user_id': dealer.user.id,
                    'name': dealer.business_name,
                    'type': 'dealer',
                    'email': dealer.business_email,
                    'status': dealer.status
                })

          
            if not combined_stores:
                return Response({
                    'message': 'No store profiles found',
                    'stores': []
                }, status=status.HTTP_404_NOT_FOUND)

        
            serializer = StoreProfileSerializer(combined_stores, many=True)
            
            return Response({
                'message': 'Stores retrieved successfully',
                'stores': serializer.data
            }, status=status.HTTP_200_OK)

        except Exception as e:
         
            return Response({
                'message': 'An error occurred while fetching store profiles',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_store_by_user_id(self, request, user_id):
        try:
         
            try:
                seller_profile = SellerProfile.objects.select_related('user').get(user_id=user_id)
                store_data = {
                    'user_id': seller_profile.user.id,
                    'name': seller_profile.store_name,
                    'type': 'seller',
                    'email': seller_profile.store_email,
                    'status': seller_profile.status
                }
                serializer = StoreProfileSerializer(store_data)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except SellerProfile.DoesNotExist:
              
                try:
                    dealer_profile = DealerProfile.objects.select_related('user').get(user_id=user_id)
                    store_data = {
                        'user_id': dealer_profile.user.id,
                        'name': dealer_profile.business_name,
                        'type': 'dealer',
                        'email': dealer_profile.business_email,
                        'status': dealer_profile.status
                    }
                    serializer = StoreProfileSerializer(store_data)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except DealerProfile.DoesNotExist:
                    return Response({
                        'message': f'No store profile found for user ID {user_id}'
                    }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({
                'message': 'An error occurred while fetching store profile',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





#----------------------------------------Products By Store---------------------------




class StoreProductView(APIView):
    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination
    authentication_classes = []

    def get(self, request, user_id):
        try:
    
            is_seller = SellerProfile.objects.filter(user_id=user_id).exists()
            is_dealer = DealerProfile.objects.filter(user_id=user_id).exists()

        
            if not (is_seller or is_dealer):
                return Response({
                    'message': 'No store found for the given user ID',
                    'products': []
                }, status=status.HTTP_404_NOT_FOUND)

       
            products = Product.objects.filter(user_id=user_id).select_related(
                'category', 'sub_category', 'child_category', 
                'brand', 'model'
            )

            
            if not products.exists():
                return Response({
                    'message': 'No products found for this store',
                    'products': []
                }, status=status.HTTP_404_NOT_FOUND)

   
            paginator = self.pagination_class()
            paginated_products = paginator.paginate_queryset(products, request)

            serializer = ProductByStoreSerializer(paginated_products, many=True)

     
            return paginator.get_paginated_response(serializer.data)

        except Exception as e:
            
            return Response({
                'message': 'An error occurred while fetching store products',
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


#---------------------------------- Dashboard -------------------------------



class UserSummaryView(APIView):
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user

        # Total Purchased Products
        total_products_purchased = UserOrder.objects.filter(user=user).aggregate(
            total=Sum('items__quantity')
        )['total'] or 0

        # Total Amount Paid
        total_amount_paid = UserOrder.objects.filter(user=user).aggregate(
            total=Sum('amount_paid')
        )['total'] or 0

        # Total Due Amount
        total_due = UserOrder.objects.filter(user=user).aggregate(
            total_due=Sum('total_amount') - Sum('amount_paid')
        )['total_due'] or 0

        response_data = {
            "total_products_ordered": total_products_purchased,
            "total_amount_paid": total_amount_paid,
            "total_due": total_due,
        }

        return Response(response_data)
    
class UserAnalyticsView(APIView):
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        
        # Get the start of the year 2025
        start_of_2025 = timezone.datetime(2025, 1, 1)

        # Generate a list of all months in 2025
        all_months = [timezone.datetime(2025, month, 1) for month in range(1, 13)]
        
        # Fetch orders for the user from 2025 and aggregate by month
        analytics = (
            UserOrder.objects.filter(user=user, created_at__gte=start_of_2025)
            .annotate(month=TruncMonth('created_at'))  # Group by month
            .values('month')
            .annotate(
                products_purchased=Count('items'),  # Count products associated with the order
                amount_spent=Sum('total_amount')  # Sum of the order amount
            )
            .order_by('month')  # Sort by month
        )

        # Create a dictionary of the analytics data, indexed by the month
        analytics_dict = {order['month'].month: order for order in analytics}

        # Prepare the final response data, ensuring every month is included
        response_data = []
        for month in all_months:
            month_number = month.month
            order_data = analytics_dict.get(month_number, {'products_purchased': 0, 'amount_spent': 0})
            response_data.append({
                "month": month_number,
                "products_purchased": order_data['products_purchased'],
                "amount_spent": float(order_data['amount_spent'] or 0)  # Ensure it's a float
            })

        return Response({"analytics": response_data})

class UserCartView(APIView):
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user

        # Fetch User's Cart
        cart = Cart.objects.filter(user=user).first()

        if not cart:
            return Response({
                "item_count": 0  # No items in the cart
            })

        # Get the number of items in the cart
        item_count = CartItem.objects.filter(cart=cart).count()  # Get the number of items

        response_data = {
            "item_count": item_count,  # Only return the item count
        }

        return Response(response_data)


