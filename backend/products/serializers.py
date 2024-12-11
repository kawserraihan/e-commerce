from django.db import transaction
from rest_framework import serializers
from .models import Product, ProductImage, OrderItem, UserOrder, ProductVariant, WholesalePrice
from core.models import Category, SubCategory, ChildCategory, Brand, Model, Color, Size


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image', 'alt_text', 'product']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'

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
    
    additionalImages = ProductImageSerializer(many=True, read_only=True, source='images')
    wholesale_prices = WholesalePriceSerializer(many=True, read_only=True, source='wholesaleproduct')
    product_variants = ProductVariantSerializer(many=True, read_only=True, source='variants')


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
        read_only_fields = ['id', 'slug', 'created_at', 'modified_at']

    def create(self, validated_data):
        product_name = validated_data.get('product_name')
        product_code = validated_data.get('product_code')

        # Generate slug by combining product_name and product_code, replacing spaces with hyphens
        validated_data['slug'] = f"{product_name}-{product_code}".replace(" ", "-").lower()

        # Replace spaces with underscores in product_code
        validated_data['product_code'] = product_code.replace(" ", "_")

        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'product_name' in validated_data or 'product_code' in validated_data:
            product_name = validated_data.get('product_name', instance.product_name)
            product_code = validated_data.get('product_code', instance.product_code)

            # Regenerate slug with updated product_name and product_code
            instance.slug = f"{product_name}-{product_code}".replace(" ", "-").lower()

            # Replace spaces with underscores in product_code
            instance.product_code = product_code.replace(" ", "_")

        return super().update(instance, validated_data)



class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.product_name', read_only=True)
    product_image = serializers.ImageField(source='product.product_image', read_only=True)
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'product_image', 'quantity', 'price', 'total_price']
    
class UserOrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    user_name = serializers.SerializerMethodField()
    user_phone = serializers.CharField(source='user.phone', read_only=True)

    class Meta:
        model = UserOrder
        fields = ['id', 'user', 'user_name', 'user_phone', 'delivery_status', 'payment_status', 'amount_paid', 'total_amount', 'created_at', 'items']
        read_only_fields = ['id', 'user', 'user_phone', 'total_amount', 'created_at']

    def get_user_name(self, obj):
        # Combine first and last names
        return f"{obj.user.first_name} {obj.user.last_name}".strip()

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = UserOrder.objects.create(**validated_data)

        total_amount = 0
        with transaction.atomic():
            for item_data in items_data:
                product = item_data['product']
                quantity = item_data['quantity']
                price = item_data['price']

                if product.stock_quantity < quantity:
                    raise serializers.ValidationError(f"Not enough stock for {product.product_name}")
            
            # Deduct stock and calculate total
            product.stock_quantity -= quantity
            product.save()
            order_item = OrderItem.objects.create(order=order, product=product, quantity=quantity, price=price)
            total_amount += order_item.total_price
        
        order.total_amount = total_amount
        order.save()
        return order

