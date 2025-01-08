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
from .models import Menu, Permission, UserRole, Role, UserAccount, SellerProfile, DealerProfile, OTP, OTP_SMS
from .serializers import MenuSerializer, RoleSerializer, UserAccountSerializer, UserRoleSerializer, SellerProfileSerializer, DealerProfileSerializer
from users.authentication import CustomJwtAuthentication
from django.http import Http404
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.status import HTTP_200_OK
from django.core.mail import send_mail
from datetime import datetime, timedelta

import logging

logging.basicConfig(level=logging.DEBUG)


User = UserAccount

class CustomTokenObtainPairView(TokenObtainPairView):
    def get(self, request, *args, **kwargs):
        return Response({"message": "This endpoint expects a POST request."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            # Get the authenticated user
            user = self.get_user(request.data.get('email'))
            if user:
                # Fetch user roles with id and name
                roles = UserRole.objects.filter(user=user).select_related('role')
                role_data = [{"id": role.role.id, "name": role.role.name} for role in roles]

                # Flatten user data into the response
                response.data.update({
                    "id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "phone": user.phone,
                    "roles": role_data,
                })

                # Set cookies for tokens
                response.set_cookie(
                    'access',
                    access_token,
                    max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                    path=settings.AUTH_COOKIE_PATH,
                    secure=settings.AUTH_COOKIE_SECURE,
                    httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                    samesite=settings.AUTH_COOKIE_SAMESITE,
                )
                response.set_cookie(
                    'refresh',
                    refresh_token,
                    max_age=settings.AUTH_COOKIE_REFRESH_MAX_AGE,
                    path=settings.AUTH_COOKIE_PATH,
                    secure=settings.AUTH_COOKIE_SECURE,
                    httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                    samesite=settings.AUTH_COOKIE_SAMESITE,
                )

        return response

    def get_user(self, email):
        """Fetch the user object based on email."""
        from django.contrib.auth import get_user_model
        User = get_user_model()
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return None


    

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
    


#--------------------------------Role Permissions-----------------------------------



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
        # Fetch permissions based on the user's role(s)
        if request.user.is_superuser:
            # Superusers can fetch all permissions
            permissions_data = Permission.objects.all()
        else:
            # Regular users fetch permissions only for their role(s)
            role_ids = request.user.roles.values_list('id', flat=True)  # Fetch user's role IDs
            permissions_data = Permission.objects.filter(role_id__in=role_ids)

        # Return raw permission data
        return Response(list(permissions_data.values()), status=status.HTTP_200_OK)

    def post(self, request):
        # Only superusers can modify permissions
        if not request.user.is_superuser:
            return Response({"error": "You do not have permission to modify permissions."}, status=status.HTTP_403_FORBIDDEN)

        # Extract role_id and menu_id from request
        role_id = request.data.get('role_id')
        menu_id = request.data.get('menu_id')

        if not role_id or not menu_id:
            return Response({"error": "Role and Menu ID are required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            role = Role.objects.get(id=role_id)
            menu = Menu.objects.get(id=menu_id)
        except (Role.DoesNotExist, Menu.DoesNotExist):
            return Response({"error": "Invalid role or menu"}, status=status.HTTP_400_BAD_REQUEST)

        # Create new permission
        permission = Permission(role=role, menu=menu)
        permission.save()

        return Response({"message": "Permission added successfully!"}, status=status.HTTP_201_CREATED)



class UserDetailAPIView(APIView):
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads

    def get(self, request, *args, **kwargs):
        """Return the current user's information."""
        serializer = UserAccountSerializer(request.user)
        return Response(serializer.data)

class UserAccountViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.filter(is_deleted=False)
    serializer_class = UserAccountSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_deleted = True
        instance.save()
        return Response({"detail": "User deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

    # @action(detail=True, methods=['get'])
    # def roles(self, request, pk=None):
    #     user = get_object_or_404(UserAccount, pk=pk)  # Get the user by primary key
    #     user_roles = UserRole.objects.filter(user=user)  # Fetch roles for the user
    #     roles = Role.objects.filter(id__in=user_roles.values_list('role_id', flat=True))  # Get Role objects
    #     serializer = RoleSerializer(roles, many=True)  # Serialize Role objects
    #     return Response(serializer.data)

    


#----------------------------------------User Role ViewSets--------------------------------


class UserRoleViewSet(viewsets.ModelViewSet):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer
    permission_classes = [permissions.IsAuthenticated]  # Default to authenticated access
    authentication_classes = []

    def get_permissions(self):
        """
        Override permissions for POST to use custom one-time permission.
        """
        if self.request.method == 'POST':
            return [permissions.AllowAny()]  # Open access for first-time creation
        return super().get_permissions()

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('user_id')  # Get the user ID
        role_id = request.data.get('role_id')  # Get the role ID

        if not user_id or not role_id:
            return Response(
                {"detail": "user_id and role_id are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = UserAccount.objects.get(id=user_id)
            role = Role.objects.get(id=role_id)
        except UserAccount.DoesNotExist:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Role.DoesNotExist:
            return Response({"detail": "Role not found."}, status=status.HTTP_404_NOT_FOUND)

        # Check if UserRole exists for the user and is not used
        user_role, created = UserRole.objects.get_or_create(user=user, role=role)
        if not created and user_role.is_used:
            return Response(
                {"detail": "User role already assigned and used."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Assign the role and mark as used
        user_role.is_used = True
        user_role.save()

        return Response(
            {"detail": "User role assigned successfully."},
            status=status.HTTP_201_CREATED,
        )

class UserRolesByUserID(APIView):
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]  # Default to authenticated access


    def get(self, request, user_id):
        try:
            # Check if the user exists
            user = UserAccount.objects.get(id=user_id)

            # Fetch roles associated with the user
            user_roles = UserRole.objects.filter(user=user)
            if not user_roles.exists():
                return Response({"error": "No roles found for this user."}, status=status.HTTP_404_NOT_FOUND)

            # Serialize roles
            serializer = UserRoleSerializer(user_roles, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except UserAccount.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




#-------------------------------------------------------x-----------------------------------





class SellerProfileViewSet(viewsets.ModelViewSet):
    queryset = SellerProfile.objects.all()
    serializer_class = SellerProfileSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads

    def get_permissions(self):
        """
        Override permissions for POST to use custom one-time permission.
        """
        if self.request.method == 'POST':
            return [permissions.AllowAny()]  # Open access for first-time creation
        return super().get_permissions()




class DealerProfileViewSet(viewsets.ModelViewSet):
    queryset = DealerProfile.objects.all()
    serializer_class = DealerProfileSerializer
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = PageNumberPagination
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads

    def create(self, request, *args, **kwargs):
        user_data = request.data.pop('user')
        user_serializer = UserAccountSerializer(data=user_data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()

        dealer_data = request.data
        dealer_data['user'] = user.id
        serializer = self.get_serializer(data=dealer_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserProfileDetailAPI(APIView):
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_data = UserAccountSerializer(user).data

        # Determine if the user has additional profiles
        profile_data = {}
        if hasattr(user, 'seller_profile'):
            profile_data['seller_profile'] = SellerProfile.objects.filter(user=user).values().first()
        if hasattr(user, 'dealer_profile'):
            profile_data['dealer_profile'] = DealerProfile.objects.filter(user=user).values().first()

        # Fetch roles
        roles = UserRole.objects.filter(user=user).values('role__id', 'role__name')

        # Combine data
        user_data.update({
            'profiles': profile_data,
            'roles': list(roles),
        })

        return Response(user_data, status=HTTP_200_OK)


class UserProfileDetailAPI(APIView):
    authentication_classes = [CustomJwtAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """Fetch user information with associated profiles and roles."""
        user = request.user
        user_data = UserAccountSerializer(user).data

        # Determine if the user has additional profiles
        profile_data = {}
        if hasattr(user, 'seller_profile'):
            profile_data['seller_profile'] = SellerProfileSerializer(user.seller_profile).data
        if hasattr(user, 'dealer_profile'):
            profile_data['dealer_profile'] = DealerProfileSerializer(user.dealer_profile).data

        # Fetch roles
        roles = UserRole.objects.filter(user=user).values('role__id', 'role__name')

        # Combine data
        user_data.update({
            'profiles': profile_data,
            'roles': list(roles),
        })

        return Response(user_data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        """Update user and profile information."""
        user = request.user

        # Update UserAccount information
        user_data = request.data.get('user', {})
        user_serializer = UserAccountSerializer(user, data=user_data, partial=True)
        if user_serializer.is_valid(raise_exception=True):
            user_serializer.save()

        # Update SellerProfile if present
        seller_data = request.data.get('seller_profile')
        if seller_data and hasattr(user, 'seller_profile'):
            seller_serializer = SellerProfileSerializer(user.seller_profile, data=seller_data, partial=True)
            if seller_serializer.is_valid(raise_exception=True):
                seller_serializer.save()

        # Update DealerProfile if present
        dealer_data = request.data.get('dealer_profile')
        if dealer_data and hasattr(user, 'dealer_profile'):
            dealer_serializer = DealerProfileSerializer(user.dealer_profile, data=dealer_data, partial=True)
            if dealer_serializer.is_valid(raise_exception=True):
                dealer_serializer.save()

        # Prepare response data
        updated_data = UserAccountSerializer(user).data
        profiles = {
            'seller_profile': SellerProfileSerializer(user.seller_profile).data if hasattr(user, 'seller_profile') else None,
            'dealer_profile': DealerProfileSerializer(user.dealer_profile).data if hasattr(user, 'dealer_profile') else None,
        }
        roles = UserRole.objects.filter(user=user).values('role__id', 'role__name')

        updated_data.update({
            'profiles': profiles,
            'roles': list(roles),
        })

        return Response(updated_data, status=status.HTTP_200_OK)
    




#------------------------------ OTP Registration ------------------------

class OTPRegistrationView(APIView):
    """
    View to handle sending OTP for email verification.
    """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        print(f"Received email for OTP registration: {email}")

        # Check if the user exists
        user = User.objects.filter(email=email).first()

        if user:
            # Check if the account is blocked
            if user.is_blocked:
                return Response(
                    {"detail": "Account is temporarily blocked. Please try again later."},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Check if the account is already verified
            if user.is_verified:
                return Response(
                    {"detail": "Account already verified."},
                    status=status.HTTP_400_BAD_REQUEST
                )
        else:
            # Create a new user if they don't exist
            user_data = request.data.copy()  # Create a mutable copy of request data
            user_data.pop('email', None)  # Remove the 'email' key to avoid duplication
            user = User.objects.create(email=email, **user_data)

        # Send OTP if the user is not verified
        if not user.is_verified:
            try:
                otp = OTP.send_otp(email=email)  # Correctly pass email to send_otp
                request.session['otp_id'] = otp.id
                request.session['email'] = email

                print(f"OTP sent for email: {email}, OTP ID: {otp.id}")
                return Response(
                    {"message": "OTP sent successfully.", "otp_id": otp.id, "email": email},
                    status=status.HTTP_200_OK
                )
            except Exception as e:
                print(f"Error sending OTP: {e}")
                return Response(
                    {"detail": f"Failed to send OTP: {e}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        return Response({"detail": "Account already verified."}, status=status.HTTP_400_BAD_REQUEST)



# class OTPRegistrationView(APIView):
#     """
#     View to handle sending OTP for email verification.
#     """
#     permission_classes = [permissions.AllowAny]
#     authentication_classes = []
#     def post(self, request, *args, **kwargs):
#         email_data = request.data.get('email')  # Get the email dictionary

#         # Extract the email string from the dictionary
#         if isinstance(email_data, dict):
#             email = email_data.get('email', '')  # Safely access the email inside the dictionary
#         else:
#             email = email_data  # Default to an empty string if email is not a dictionary or is missing

#         print(f"Received email for OTP registration: {email}")
        
#         # Check if user is blocked
#         user = User.objects.filter(email=email).first()

#         if user and user.is_blocked:
#             return Response({"detail": "Account is temporarily blocked. Please try again later."}, status=status.HTTP_403_FORBIDDEN)
        
#         # Check if user exists and is verified
#         if user and user.is_verified:
#             return Response({"detail": "Account already verified."}, status=status.HTTP_400_BAD_REQUEST)

#         # Create new user if they don't exist
#         if not user:
#             user = User.objects.create(email=email, **request.data)
        
#         # Send OTP if user is not verified
#         if not user.is_verified:
#             otp = OTP.send_otp(email)

#             request.session['otp_id'] = otp.id
#             request.session['email'] = email

#             print(f"OTP sent for email: {email}, OTP ID: {otp.id}")
#             return Response({"message": "OTP sent successfully.", "otp_id": otp.id, "email": email}, status=status.HTTP_200_OK)
        
#         return Response({"detail": "Account already verified."}, status=status.HTTP_400_BAD_REQUEST)
    

# class OTPRegistrationViewSMS(APIView):
#     permission_classes = [permissions.AllowAny]
#     authentication_classes = []

#     def post(self, request, *args, **kwargs):
#         phone = request.data.get('phone')

#         user = User.objects.filter(phone=phone).first()

#         if user and user.is_blocked:
#             return Response({"detail": "Account is temporarily blocked. Please try again later."}, status=status.HTTP_403_FORBIDDEN)

#         if user and user.is_verified:
#             return Response({"detail": "Account already verified."}, status=status.HTTP_400_BAD_REQUEST)

#         if not user:
#             user = User.objects.create(phone=phone, **request.data)

#         if not user.is_verified:
#             otp = OTP_SMS.send_otp(phone)
#             request.session['otp_id'] = otp.id
#             request.session['phone'] = phone
#             return Response({"message": "OTP sent successfully.", "otp_id": otp.id, "phone": phone}, status=status.HTTP_200_OK)

#         return Response({"detail": "Account already verified."}, status=status.HTTP_400_BAD_REQUEST)



# class OTPVerificationViewSMS(APIView):
#     """
#     View to verify OTP and complete registration.
#     """
#     permission_classes = [permissions.AllowAny]
#     authentication_classes = []
#     def post(self, request, *args, **kwargs):
        
#         otp_code = request.data.get('otp_code')

#         # Retrieve OTP ID and email from session
#         otp_id = request.session.get('otp_id')
#         email = request.session.get('email')
#         phone = request.session.get('phone')


#         # Check if user is blocked
#         user = User.objects.filter(email=email).first()
#         if user and user.is_blocked:
#             return Response({"detail": "Account is temporarily blocked. Please try again later."}, status=status.HTTP_403_FORBIDDEN)

#         # Find the OTP record and check if it is expired
#         otp = OTP_SMS.objects.filter(id=otp_id, phone=phone).first()
#         if not otp:
#             return Response({"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

#         if otp.is_expired():
#             # OTP expired, handle attempts
#             if user:
#                 user.otp_attempts += 1
#                 user.save()

#                 # Block user if they exceeded max resend attempts
#                 if user.otp_attempts > settings.OTP_ATTEMPTS:
#                     user.is_blocked = True
#                     user.save()
#                     return Response({"detail": "Too many failed attempts. Account is blocked for 1 hour."}, status=status.HTTP_403_FORBIDDEN)

#             return Response({"detail": "OTP expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)

#         # If OTP matches
#         if otp.otp_code == otp_code:
#             user.is_verified = True
#             user.is_active = True
#             user.is_blocked = False  # Reset blocked status if verification is successful
#             user.otp_attempts = 0  # Reset attempts
#             user.save()

#             return Response({"message": "User verified successfully."}, status=status.HTTP_200_OK)
        
#         return Response({"detail": "Invalid OTP code."}, status=status.HTTP_400_BAD_REQUEST)



class OTPVerificationView(APIView):
    """
    View to verify OTP and complete registration.
    """
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
    def post(self, request, *args, **kwargs):
        
        otp_code = request.data.get('otp_code')

        # Retrieve OTP ID and email from session
        otp_id = request.session.get('otp_id')
        email = request.session.get('email')
        # phone = request.session.get('phone')


        # Check if user is blocked
        user = User.objects.filter(email=email).first()
        if user and user.is_blocked:
            return Response({"detail": "Account is temporarily blocked. Please try again later."}, status=status.HTTP_403_FORBIDDEN)

        # Find the OTP record and check if it is expired
        otp = OTP.objects.filter(id=otp_id, email=email).first()
        if not otp:
            return Response({"detail": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

        if otp.is_expired():
            # OTP expired, handle attempts
            if user:
                user.otp_attempts += 1
                user.save()

                # Block user if they exceeded max resend attempts
                if user.otp_attempts > settings.OTP_ATTEMPTS:
                    user.is_blocked = True
                    user.save()
                    return Response({"detail": "Too many failed attempts. Account is blocked for 1 hour."}, status=status.HTTP_403_FORBIDDEN)

            return Response({"detail": "OTP expired. Please request a new one."}, status=status.HTTP_400_BAD_REQUEST)

        # If OTP matches
        if otp.otp_code == otp_code:
            user.is_verified = True
            user.is_active = True
            user.is_blocked = False  # Reset blocked status if verification is successful
            user.otp_attempts = 0  # Reset attempts
            user.save()

            return Response({"message": "User verified successfully."}, status=status.HTTP_200_OK)
        
        return Response({"detail": "Invalid OTP code."}, status=status.HTTP_400_BAD_REQUEST)
    




