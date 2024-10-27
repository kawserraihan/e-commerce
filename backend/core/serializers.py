from rest_framework import serializers
from .models import Category, Brand, Model, Color, SubCategory, ChildCategory, Size

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = '__all__'

class ModelSerializer(serializers.ModelSerializer):

    brand_name = serializers.CharField(source='brandid.brand_name', read_only=True)

    class Meta:
        model = Model
        fields = ['id', 'model_name', 'brand_name', 'brandid', 'is_active', 'created_at', 'modified_at']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = '__all__'


class SubcategorySerializer(serializers.ModelSerializer):

    # Use category_name as a read-only field from the related Category model
    category_name = serializers.CharField(source='categoryid.category_name', read_only=True)

    class Meta:
        model = SubCategory
        fields = ['id', 'subcategory_name', 'is_active', 'created_at', 'modified_at', 'categoryid', 'category_name']

class ChildcategorySerializer(serializers.ModelSerializer):

    # Use category_name as a read-only field from the related Category model
    category_name = serializers.CharField(source='categoryid.category_name', read_only=True)
    # Use subcategory_name as a read-only field from the related SubCategory model
    subcategory_name = serializers.CharField(source='subcategoryid.subcategory_name', read_only=True)

    class Meta:
        model = ChildCategory
        fields = ['id', 'childcategory_name', 'is_active', 'created_at', 'modified_at', 'categoryid', 'category_name', 'subcategoryid', 'subcategory_name']

class SizeSerializer(serializers.ModelSerializer):

    # Use category_name as a read-only field from the related Category model
    category_name = serializers.CharField(source='categoryid.category_name', read_only=True)
    # Use subcategory_name as a read-only field from the related SubCategory model
    subcategory_name = serializers.CharField(source='subcategoryid.subcategory_name', read_only=True)
    # Use childcategory_name as a read-only field from the related ChildCategory model
    childcategory_name = serializers.CharField(source='childcategoryid.childcategory_name', read_only=True)

    class Meta:
        model = Size
        fields = ['id', 'size_name', 'is_active', 'created_at', 'modified_at', 'categoryid', 'category_name', 'subcategoryid', 'subcategory_name', 'childcategoryid', 'childcategory_name']
