
from django.urls import path, include
from rest_framework.routers import DefaultRouter

#------Public Imports For Products-----

from .views import ProductViewSet, ProductImageViewSet, UserOrderViewSet, ProductStockUpdateView, ProductVariantViewSet, WholesalePriceViewSet, CartViewSet

#------Public Imports For Products-----

from .views import ProductPublicViewSet, ProductVariantPublicViewSet, ProductImagePublicViewSet, WholesalePricePublicViewSet, StoreProfileView, StoreProductView

# ------Dashboards ------

from .views import UserSummaryView, UserAnalyticsView, UserCartView

router = DefaultRouter()

#-------------------------------------Private Routes--------------------------------

router.register(r'products', ProductViewSet, basename='product')
router.register(r'product-images', ProductImageViewSet, basename='product-image')
router.register(r'orders', UserOrderViewSet, basename='userorder')
router.register(r'product-variants', ProductVariantViewSet, basename='product-variant')
router.register(r'wholesale-prices', WholesalePriceViewSet, basename='wholesale-price')
router.register(r'carts', CartViewSet, basename='cart')


#---------------------------Public Routes--------------------------------



router.register(r'productspub', ProductPublicViewSet, basename='productpub')
router.register(r'wholesale-public', WholesalePricePublicViewSet, basename='wholesalepub')
router.register(r'public-variants', ProductVariantPublicViewSet, basename='public-variant')
router.register(r'additional-images', ProductImagePublicViewSet, basename='additional-image')


urlpatterns = [
    path('', include(router.urls)),
    path('products/<int:pk>/update-stock/', ProductStockUpdateView.as_view(), name='product-update-stock'),
    path('stores/', StoreProfileView.as_view()),
    path('stores/<int:user_id>/', StoreProfileView.as_view()),
    path('stores/<int:user_id>/products/', StoreProductView.as_view(), name='store-products'),
    path('dashboard/user/summary/', UserSummaryView.as_view(), name='user-summary'),
    path('dashboard/user/analytics/', UserAnalyticsView.as_view(), name='user-analytics'),
    path('dashboard/user/cart/', UserCartView.as_view(), name='user-cart'),

]



