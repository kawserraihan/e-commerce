from django.db import models
import random

class Coupon(models.Model):
    coupon = models.CharField(max_length=100, unique=True, blank=True, null=True)
    commision = models.DecimalField(max_digits=5, decimal_places=0)
    minumum_amount = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_at = models.DateTimeField(blank=True, null=True)
    modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

    def save(self, *args, **kwargs):
    # Generate a unique 12-digit number if not provided
        if not self.coupon:
            unique_coupon = False
            while not unique_coupon:
                coupon_code = ''.join([str(random.randint(0, 9)) for _ in range(12)])
                if not Coupon.objects.filter(coupon=coupon_code).exists():
                    self.coupon = coupon_code
                    unique_coupon = True
        super().save(*args, **kwargs)

    def __str__(self):  
        return f"Coupon {self.coupon}"