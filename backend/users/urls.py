from django.urls import path, include
from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
    UserMenuView, 
    PermissionManageView,
    UserAccountViewSet,
    UserDetailAPIView
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', UserAccountViewSet, basename='user')



urlpatterns = [
    path('', include(router.urls)),
    path('me/', UserDetailAPIView.as_view(), name='user-detail'),
    path('user-menu/', UserMenuView.as_view(), name='user-menu'),
    path('permissions/', PermissionManageView.as_view(), name='permissions'),
    path('jwt/create/', CustomTokenObtainPairView.as_view()),
    path('jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('jwt/verify/', CustomTokenVerifyView.as_view()),
    path('logout/', LogoutView.as_view()),
]

