from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BrandViewSet, ModelViewSet, ColorViewSet, SubcategoryViewSet, ChildCategoryViewSet, SizeViewSet, get_subcategories_by_category, get_childcategories_by_category_and_subcategory

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'models', ModelViewSet, basename='model')
router.register(r'colors', ColorViewSet, basename='color')
router.register(r'subcategories', SubcategoryViewSet, basename='subcategory')
router.register(r'childcategories', ChildCategoryViewSet, basename='childcategory')
router.register(r'sizes', SizeViewSet, basename='size')


urlpatterns = [
    path('subcategories/by-category/<int:category_id>/', get_subcategories_by_category, name='get_subcategories_by_category'),
    path('childcategories/by-category/by-subcategory/<int:category_id>/<int:subcategory_id>/', get_childcategories_by_category_and_subcategory, name='get_subcategories_by_category_and_subcategory'),
    path('', include(router.urls)),
]
