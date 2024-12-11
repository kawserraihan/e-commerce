from rest_framework import viewsets, permissions, status
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.shortcuts import render
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from .models import Menu, Permission, UserRole, Role, UserAccount
from .serializers import MenuSerializer, RoleSerializer, UserAccountSerializer
from users.authentication import CustomJwtAuthentication
from django.http import Http404
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action

import logging

logger = logging.getLogger(__name__)


class CustomTokenObtainPairView(TokenObtainPairView):
    def get(self, request, *args, **kwargs):

        return Response({"message": "This endpoint expects a POST request."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path = settings.AUTH_COOKIE_PATH,
                secure = settings.AUTH_COOKIE_SECURE,
                httponly = settings.AUTH_COOKIE_HTTP_ONLY,
                samesite = settings.AUTH_COOKIE_SAMESITE)
            
            response.set_cookie(
                'refresh',
                refresh_token,
                max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                path = settings.AUTH_COOKIE_PATH,
                secure = settings.AUTH_COOKIE_SECURE,
                httponly = settings.AUTH_COOKIE_HTTP_ONLY,
                samesite = settings.AUTH_COOKIE_SAMESITE
            )
        
        return response
    

class CustomTokenRefreshView(TokenRefreshView):
    def get(self, request, *args, **kwargs):
        # logger.warning("Attempted to access TokenRefreshView with GET method instead of POST.")
        return Response(
            {"message": "This endpoint expects a POST request."},
            status=status.HTTP_405_METHOD_NOT_ALLOWED
        )

    def post(self, request, *args, **kwargs):
        # logger.info("Processing POST request for token refresh.")
        
        refresh_token = request.COOKIES.get('refresh')
        
        if refresh_token:
            request.data['refresh'] = refresh_token
            # logger.info("Refresh token found in cookies and added to the request.")
        else:
            print("No refresh token found in cookies.")
        
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get('access')
            # logger.info("Access token refreshed successfully.")
            
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
        else:
            # logger.error(f"Failed to refresh access token. Status code: {response.status_code}")
            print("Failed to refresh access token.")
            
        return response 
    
class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')

        if access_token:
            request.data['token'] = access_token

        return super().post(request, *args, **kwargs)
    
class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')

        return response
    
#Role Permissions

class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [permissions.IsAuthenticated]

class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = [permissions.IsAuthenticated]

class UserMenuView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [CustomJwtAuthentication]

    def get(self, request):
    # Get user roles
        roles = UserRole.objects.filter(user=request.user).values_list('role_id', flat=True)

        # Get allowed menu IDs for roles
        menu_ids = Permission.objects.filter(role_id__in=roles).values_list('menu_id', flat=True)

        # Fetch top-level menus (parent menus)
        parent_menus = Menu.objects.filter(id__in=menu_ids, parent=None).order_by('sort_order')

        # Create a dictionary to hold parent menus and their submenus
        menus_data = []
        for parent_menu in parent_menus:
            # Fetch the submenus for each parent menu
            submenus = Menu.objects.filter(parent=parent_menu).order_by('sort_order')

            # Serialize the parent menu and submenus
            parent_menu_data = MenuSerializer(parent_menu).data
            submenus_data = MenuSerializer(submenus, many=True).data

            # Add submenu data to parent menu data
            parent_menu_data['submenus'] = submenus_data

            menus_data.append(parent_menu_data)

        return Response(menus_data)

class PermissionManageView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [CustomJwtAuthentication]

    def get(self, request):
        # Only admin can manage permissions
        if not request.user.is_staff:
            raise Http404("You do not have permission to view this data.")

        permissions_data = Permission.objects.all()
        # Serialize data and return permissions
        return Response(permissions_data.values())

    def post(self, request):
        # Only admin can modify permissions
        if not request.user.is_superuser:
            raise Http404("You do not have permission to modify permissions.")

        # Assuming the payload is { "role_id": 1, "menu_id": 2 }
        role_id = request.data.get('role_id')
        menu_id = request.data.get('menu_id')

        if not role_id or not menu_id:
            return Response({"error": "Role and Menu ID are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            role = Role.objects.get(id=role_id)
            menu = Menu.objects.get(id=menu_id)
        except Role.DoesNotExist or Menu.DoesNotExist:
            return Response({"error": "Invalid role or menu"}, status=status.HTTP_400_BAD_REQUEST)

        permission = Permission(role=role, menu=menu)
        permission.save()

        return Response({"message": "Permission added successfully!"}, status=status.HTTP_201_CREATED)
    


class UserAccountViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.all()
    serializer_class = UserAccountSerializer
    permission_classes = [IsAdminUser]  # Only allow superusers to access all users data

    def get_permissions(self):
        if self.action == 'list':
            # Only superuser can view the list of users
            return [permissions.IsAdminUser()]
        return [permissions.IsAuthenticated()]  # Default permission for other actions

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request):
        """Allow users to fetch their own details."""
        serializer = UserAccountSerializer(request.user)
        return Response(serializer.data)


class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """Return the current user's information."""
        serializer = UserAccountSerializer(request.user)
        return Response(serializer.data)