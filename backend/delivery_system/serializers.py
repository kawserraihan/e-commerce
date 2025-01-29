from rest_framework import serializers
from .models import DeliveryInfo
from products.models import UserOrder

class DeliveryInfoSerializer(serializers.ModelSerializer):
    order_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = DeliveryInfo
        fields = [
            'full_name', 'email', 'phone', 'alt_phone', 'address',
            'city', 'note', 'coupon', 'order_id'
        ]

    def validate_order_id(self, value):
        if not UserOrder.objects.filter(id=value).exists():
            raise serializers.ValidationError("Invalid order ID")
        return value


    def create(self, validated_data):
        order_id = validated_data.pop('order_id')
        order = UserOrder.objects.get(id=order_id)
        validated_data['order'] = order
        return super().create(validated_data)
