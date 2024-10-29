from rest_framework import serializers
from .models import Product
from core.models import Category, SubCategory, ChildCategory, Brand, Model, Color, Size


class ProductSerializer(serializers.ModelSerializer):

    category_name = serializers.CharField(source='category.category_name', read_only=True)
    subcategory_name = serializers.CharField(source='sub_category.subcategory_name', read_only=True)
    childcategory_name = serializers.CharField(source='child_category.childcategory_name', read_only=True)
    brand_name = serializers.CharField(source='brand.brand_name', read_only=True)
    model_name = serializers.CharField(source='model.model_name', read_only=True)
    

    class Meta:
        model = Product
        fields = [
            'id',  # Automatically generated field
            'product_name',
            'product_type',
            'product_description',
            'product_code',
            'product_image',
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
            'colors',  # Many-to-many relationship
            'sizes',  # Many-to-many relationship
            'guarantee',
            'warranty',
            'is_active',
            'created_at',  # Automatically generated field
            'modified_at',  # Automatically generated field
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
