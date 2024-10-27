from rest_framework import viewsets, permissions
from .models import Product
from .serializers import ProductSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.authentication import CustomJwtAuthentication
from rest_framework.pagination import PageNumberPagination

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination