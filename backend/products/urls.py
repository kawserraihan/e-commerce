
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductImageViewSet, UserOrderViewSet, ProductStockUpdateView, ProductVariantViewSet, WholesalePriceViewSet, WholesalePricePublicViewSet

#------Public Imports For Products-----

from .views import ProductPublicViewSet, ProductVariantPublicViewSet, ProductImagePublicViewSet


router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'product-images', ProductImageViewSet, basename='product-image')
router.register(r'orders', UserOrderViewSet, basename='userorder')
router.register(r'product-variants', ProductVariantViewSet, basename='product-variant')
router.register(r'wholesale-prices', WholesalePriceViewSet, basename='wholesale-price')

#---------------------------Public--------------------------------

router.register(r'productspub', ProductPublicViewSet, basename='productpub')
router.register(r'wholesale-public', WholesalePricePublicViewSet, basename='wholesalepub')
router.register(r'public-variants', ProductVariantPublicViewSet, basename='public-variant')
router.register(r'additional-images', ProductImagePublicViewSet, basename='additional-image')


urlpatterns = [
    path('', include(router.urls)),
    path('products/<int:pk>/update-stock/', ProductStockUpdateView.as_view(), name='product-update-stock'),

]



