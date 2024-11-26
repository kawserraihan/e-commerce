from rest_framework import viewsets, permissions, status

from .models import Product, ProductImage, UserOrder
from .serializers import ProductSerializer, ProductImageSerializer, UserOrderSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.authentication import CustomJwtAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db import transaction

from rest_framework.exceptions import ValidationError  # Import ValidationError

import logging

logger = logging.getLogger(__name__)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)
    

    @action(detail=False, methods=['get'], url_path='product/(?P<product_id>[^/.]+)')
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

    def perform_create(self, serializer):
        print("perform_create called")  # Debug print statement
        if not self.request.user.is_authenticated:
            print("Error: User must be authenticated to create an order.")
            raise ValidationError("User must be authenticated.")
        
        print(f"Attaching user {self.request.user} to the order.")  # Debug print statement
        serializer.save(user=self.request.user)  # Attach the authenticated user to the order

    def create(self, request, *args, **kwargs):
        print("Received order creation request with data:", request.data)  # Debug print statement
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            print("Data is valid, attempting to save order.")  # Debug print statement
            self.perform_create(serializer)
            print("Order created successfully.")  # Debug print statement

            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            print("Order creation failed due to invalid data:", serializer.errors)  # Debug print statement
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductStockUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk):
        # Log initial request data for debugging
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

        # Set and save the new stock quantity
        product.stock_quantity = new_stock_quantity
        product.save()
        logger.debug(f"Updated product {product.id} stock quantity to {product.stock_quantity}")

        return Response({"new_stock_quantity": product.stock_quantity}, status=status.HTTP_200_OK)