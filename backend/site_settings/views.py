from rest_framework import viewsets, permissions, status
from .models import Banner
from .serializers import BannerSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.parsers import MultiPartParser, FormParser

class BannerViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.all()
    serializer_class = BannerSerializer
    permission_classes = [permissions.AllowAny]  # Read-only for unauthenticated users
    parser_classes = (MultiPartParser, FormParser)  # To handle file uploads
    authentication_classes = []
