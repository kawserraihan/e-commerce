
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductImageViewSet, UserOrderViewSet, ProductStockUpdateView, ProductVariantViewSet, WholesalePriceViewSet


router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'product-images', ProductImageViewSet, basename='product-image')
router.register(r'orders', UserOrderViewSet, basename='userorder')
router.register(r'product-variants', ProductVariantViewSet, basename='product-variant')
router.register(r'wholesale-prices', WholesalePriceViewSet, basename='wholesale-price')

urlpatterns = [
    path('', include(router.urls)),
    path('products/<int:pk>/update-stock/', ProductStockUpdateView.as_view(), name='product-update-stock'),
]



