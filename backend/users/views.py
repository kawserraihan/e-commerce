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

# import logging

# logger = logging.getLogger(__name__)


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