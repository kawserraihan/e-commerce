
# Models (example setup for checkout information)
from django.db import models
from products.models import UserOrder

class DeliveryInfo(models.Model):
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    alt_phone = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField()
    city = models.CharField(max_length=100)
    note = models.TextField(null=True, blank=True)
    coupon = models.CharField(max_length=50, null=True, blank=True)
    order = models.ForeignKey(UserOrder, on_delete=models.CASCADE, related_name='checkout_info')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Shipping Info for Order: {self.order.id}"