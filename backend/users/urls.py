from django.urls import path, include
from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
    UserMenuView, 
    PermissionManageView,
    UserAccountViewSet,
    UserDetailAPIView,
    SellerProfileViewSet,
    DealerProfileViewSet,
    UserProfileDetailAPI,
    # OTPRegistrationView,
    OTPRegistrationViewSMS, 
    OTPVerificationViewSMS,
    # OTPVerificationView,
    UserRoleViewSet,
    UserRolesByUserID,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'all/users', UserAccountViewSet, basename='baseuser')
router.register(r'setrole', UserRoleViewSet, basename='setuserandrole')
router.register(r'sellers', SellerProfileViewSet, basename='seller')
router.register(r'dealers', DealerProfileViewSet, basename='dealer')



urlpatterns = [
    path('', include(router.urls)),
    path('me/', UserDetailAPIView.as_view(), name='user-detail'),
    path('user-profile/', UserProfileDetailAPI.as_view(), name='user-profile'),
    path('user-menu/', UserMenuView.as_view(), name='user-menu'),
    path('permissions/', PermissionManageView.as_view(), name='permissions'),
    path('jwt/create/', CustomTokenObtainPairView.as_view()),
    path('jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('jwt/verify/', CustomTokenVerifyView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('register/otp/', OTPRegistrationViewSMS.as_view(), name='otp_register'),
    path('register/verify/', OTPVerificationViewSMS.as_view(), name='otp_verify'),
    path('users/<int:user_id>/roles/', UserRolesByUserID.as_view(), name='user-roles-by-id'),
]

