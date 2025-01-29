from django.urls import path
from .views import DeliveryView

urlpatterns = [
    path('checkout/', DeliveryView.as_view(), name='checkout'),
]
