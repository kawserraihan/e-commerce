from rest_framework import serializers
from .models import Banner

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ['title', 'image', 'link', 'is_active', 'created_at', 'updated_at']

        read_only_fields = ['title', 'image', 'link', 'is_active', 'created_at', 'updated_at']