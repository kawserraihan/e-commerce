from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        read_only_fields = ['slug']

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
