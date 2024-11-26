from rest_framework import viewsets, permissions
from .models import Coupon
from .serializers import CouponSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from users.authentication import CustomJwtAuthentication
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from rest_framework.response import Response


class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
