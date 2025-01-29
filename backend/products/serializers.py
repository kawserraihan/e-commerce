from django.db import transaction
from rest_framework import serializers
from .models import Product, ProductImage, OrderItem, UserOrder, ProductVariant, WholesalePrice, CartItem, Cart
from core.models import Category, SubCategory, ChildCategory, Brand, Model, Color, Size
from users.models import SellerProfile, DealerProfile


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'product']

class ProductVariantSerializer(serializers.ModelSerializer):
    color_name = serializers.CharField(source='color.color_name', read_only=True)
    size_name = serializers.CharField(source='size.size_name', read_only=True)
    class Meta:
        model = ProductVariant
        fields = [
            'product', 
            'color', 
            'color_name', 
            'size', 
            'size_name', 
            'price', 
            'discount', 
            'stock_quantity', 
            'variantImage'
        ]
       
class WholesalePriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = WholesalePrice
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.category_name', read_only=True)
    subcategory_name = serializers.CharField(source='sub_category.subcategory_name', read_only=True)
    childcategory_name = serializers.CharField(source='child_category.childcategory_name', read_only=True)
    brand_name = serializers.CharField(source='brand.brand_name', read_only=True)
    model_name = serializers.CharField(source='model.model_name', read_only=True)
    quantity = serializers.IntegerField(source='stock_quantity',  allow_null=True, required=False)

    # Additonal Parts
    
    additionalImages = ProductImageSerializer(many=True, read_only=True, source='images')
    wholesale_prices = WholesalePriceSerializer(many=True, read_only=True, source='wholesaleproduct')
    product_variants = ProductVariantSerializer(many=True, read_only=True, source='variants')


    class Meta:
        model = Product
        fields = [
            'id',  
            'user',
            'product_name',
            'product_type',
            'product_description',
            'product_code',
            'product_image',
            'quantity',
            'category',
            'category_name',
            'sub_category',
            'subcategory_name',
            'child_category',
            'childcategory_name',
            'brand',
            'brand_name',
            'model',
            'model_name',
            'price',
            'discount',
            'slug', 
            'guarantee',
            'warranty',
            'additionalImages',
            'is_active',
            'created_at', 
            'modified_at',  
            'wholesale_prices',
            'product_variants',
        
        ]
        read_only_fields = ['id', 'slug', 'created_at', 'modified_at']

    def create(self, validated_data):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['user'] = request.user
        product_name = validated_data.get('product_name')
        product_code = validated_data.get('product_code')

        #------------Auto Slug Store--------------

        validated_data['slug'] = f"{product_name}-{product_code}".replace(" ", "-").lower()

   
        validated_data['product_code'] = product_code.replace(" ", "_")

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'product_name' in validated_data or 'product_code' in validated_data:
            product_name = validated_data.get('product_name', instance.product_name)
            product_code = validated_data.get('product_code', instance.product_code)

       
            instance.slug = f"{product_name}-{product_code}".replace(" ", "-").lower()

            instance.product_code = product_code.replace(" ", "_")

        return super().update(instance, validated_data)
    

#------------------------------------Order Item-------------------------------------



class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.product_name', read_only=True)
    product_image = serializers.ImageField(source='product.product_image', read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_image', 'quantity', 'total_price']
        read_only_fields = ['total_price', 'price', 'product_name', 'product_image']

    def get_total_price(self, obj):
        return obj.quantity * (obj.product.price - (obj.product.discount if obj.product.discount else 0))
    
class UserOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total_amount = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()
    user_phone = serializers.CharField(source='user.phone', read_only=True)

    class Meta:
        model = UserOrder
        fields = ['id', 'user', 'user_name', 'user_phone', 'delivery_status', 'payment_status', 'payment_method', 'amount_paid', 'total_amount', 'created_at', 'items']
        read_only_fields = ['id', 'user', 'user_phone', 'total_amount', 'created_at']

    def get_user_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()

    def get_total_amount(self, obj):
        total = 0
        for item in obj.items.all():
            total += item.total_price
        return total

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        payment_method = validated_data.pop('payment_method', 'cod')
        order = UserOrder.objects.create(payment_method=payment_method, **validated_data)

        with transaction.atomic():
            for item_data in items_data:
                product = Product.objects.get(id=item_data['product'].id)
                quantity = item_data['quantity']

                if product.stock_quantity < quantity:
                    raise serializers.ValidationError(f"Not enough stock for {product.id} - {product.stock_quantity} - {quantity}")

                product.stock_quantity -= quantity
                product.save()

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=quantity,
                    price=product.price - (product.discount if product.discount else 0)
                )

        return order
    
#---------------------------------------Order End---------------------------------
    

#-------------------------------------------------CART---------------------------------------------

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'subtotal']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.ReadOnlyField()

    class Meta:
        model = Cart
        fields = ['id', 'items', 'total_price']

#------------------------------------------------------X-------------------------------------------------
    



#----------------------------------------------------------------Private END--------------------------------------------------------


#----------------------------------------------------------------Publc Start ----------------------------------------------------------
class WholesalePricePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = WholesalePrice
        fields = ['product', 'min_quantity', 'max_quantity', 'price_per_unit']
        read_only_fields = ['product', 'min_quantity', 'max_quantity', 'price_per_unit']

class ProductVariantPublicSerializer(serializers.ModelSerializer):
    color_name = serializers.CharField(source='color.color_name', read_only=True)
    size_name = serializers.CharField(source='size.size_name', read_only=True)
    class Meta:
        model = ProductVariant
        fields = [
            'product', 
            'color', 
            'color_name', 
            'size', 
            'size_name', 
            'price', 
            'discount', 
            'stock_quantity', 
            'variantImage'
        ]
        read_only_fields = fields

class ProductImagePublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'product']
        read_only_fields = ['id', 'image', 'alt_text', 'product']

class ProductPublicSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.category_name', read_only=True)
    subcategory_name = serializers.CharField(source='sub_category.subcategory_name', read_only=True)
    childcategory_name = serializers.CharField(source='child_category.childcategory_name', read_only=True)
    brand_name = serializers.CharField(source='brand.brand_name', read_only=True)
    model_name = serializers.CharField(source='model.model_name', read_only=True)
    quantity = serializers.IntegerField(source='stock_quantity',  allow_null=True, required=False)
    
    additionalImages = ProductImagePublicSerializer(many=True, read_only=True, source='images')
    wholesale_prices = WholesalePricePublicSerializer(many=True, read_only=True, source='wholesaleproduct')
    product_variants = ProductVariantPublicSerializer(many=True, read_only=True, source='variants')



    class Meta:
        model = Product
        fields = [
            'id',  # Automatically generated field
            'product_name',
            'product_type',
            'product_description',
            'product_code',
            'product_image',
            'quantity',
            'category',
            'category_name',
            'sub_category',
            'subcategory_name',
            'child_category',
            'childcategory_name',
            'brand',
            'brand_name',
            'model',
            'model_name',
            'price',
            'discount',
            'slug',  # Auto-generated, read-only field
            'guarantee',
            'warranty',
            'additionalImages',
            'is_active',
            'created_at',  # Automatically generated field
            'modified_at',  # Automatically generated field
            'wholesale_prices',
            'product_variants',
        ]
        read_only_fields = [            'id',  # Automatically generated field
            'product_name',
            'product_type',
            'product_description',
            'product_code',
            'product_image',
            'quantity',
            'category',
            'category_name',
            'sub_category',
            'subcategory_name',
            'child_category',
            'childcategory_name',
            'brand',
            'brand_name',
            'model',
            'model_name',
            'price',
            'discount',
            'slug',  # Auto-generated, read-only field
            'guarantee',
            'warranty',
            'additionalImages',
            'is_active',
            'created_at',  # Automatically generated field
            'modified_at',  # Automatically generated field
            'wholesale_prices',
            'product_variants',
            ]




#--------------------------------------------------Store--------------------------------


class SellerStoreSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id')
    
    class Meta:
        model = SellerProfile
        fields = ['user_id', 'store_name', 'store_email', 'status']

class DealerStoreSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(source='user.id')
    
    class Meta:
        model = DealerProfile
        fields = ['user_id', 'business_name', 'business_email', 'status']

class StoreProfileSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    name = serializers.CharField()
    type = serializers.CharField()
    email = serializers.EmailField()
    status = serializers.CharField()


#-----------------------------------------Store Product---------------------------------------


class ProductByStoreSerializer(serializers.ModelSerializer):

    brand_name = serializers.CharField(source='brand.name', read_only=True, allow_null=True)
    model_name = serializers.CharField(source='model.name', read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 
            'product_name', 
            'product_type', 
            'product_description', 
            'product_code', 
            'product_image', 
            'category', 
            'sub_category', 
            'child_category', 
            'brand_name', 
            'model_name', 
            'price', 
            'discount', 
            'slug', 
            'stock_quantity', 
            'is_active'
        ]

