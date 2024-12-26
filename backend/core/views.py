from rest_framework import viewsets, permissions
from .models import Category, Brand, Model, Color, SubCategory, ChildCategory, Size
from .serializers import CategorySerializer, BrandSerializer, ModelSerializer, ColorSerializer, SubcategorySerializer, ChildcategorySerializer, SizeSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.authentication import CustomJwtAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Public Imports

from .serializers import CategoryPublicSerializer, SubcategoryPublicSerializer, ColorPublicSerializer, BrandPublicSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

class SubcategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubcategorySerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

class ChildCategoryViewSet(viewsets.ModelViewSet):
    queryset = ChildCategory.objects.all()
    serializer_class = ChildcategorySerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

class SizeViewSet(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

#Filtering subcategories for Childcategory dropdown

@api_view(['GET'])
def get_subcategories_by_category(request, category_id):
    subcategories = SubCategory.objects.filter(categoryid=category_id, is_active=True)
    serializer = SubcategorySerializer(subcategories, many=True)
    return Response(serializer.data)

#-----------------------------------------------------------

#Filtering Childcategories for Size dropdown

@api_view(['GET'])
def get_childcategories_by_category_and_subcategory(request, category_id, subcategory_id):
    childcategories = ChildCategory.objects.filter(categoryid=category_id, subcategoryid=subcategory_id, is_active=True)
    serializer = ChildcategorySerializer(childcategories, many=True)  # Use ChildcategorySerializer instead of SizeSerializer
    return Response(serializer.data)

#-----------------------------------------------------------


class BrandViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

class ModelViewSet(viewsets.ModelViewSet):
    queryset = Model.objects.all()
    serializer_class = ModelSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination



#----------------------------------------------------XXXXXX----------------------------------------------------
#----------------------------------------------------Public----------------------------------------------------


class CategoryPublicViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryPublicSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination

class SubCategoryPublicViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubcategoryPublicSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination

class ColorPublicViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorPublicSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination

class BrandPublicViewSet(viewsets.ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandPublicSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = PageNumberPagination