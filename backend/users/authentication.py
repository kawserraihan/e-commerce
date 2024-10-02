from django.conf import settings
from typing import Tuple
from rest_framework.request import Request
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import Token
# import logging

# logger = logging.getLogger(__name__)

class CustomJwtAuthentication(JWTAuthentication):
    def authenticate(self, request):
        try:
            header = self.get_header(request)
            if header is None:
                raw_token = request.COOKIES.get(settings.AUTH_COOKIE)
            
            else:
                raw_token = self.get_raw_token(header)

            if raw_token is None:
                return None

            validated_token = self.get_validated_token(raw_token)

            return self.get_user(validated_token), validated_token
        except Exception as e:
            # logger.exception("Error in creating user")
            raise e