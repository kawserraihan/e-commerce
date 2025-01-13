from django.db import models
from products.models import UserOrder
from django.utils.timezone import now, timedelta


class BkashToken(models.Model):
    grant_token = models.TextField()
    refresh_token = models.TextField()
    token_expiry = models.DateTimeField()

    def is_expired(self):
        """
        Check if the grant token has expired.
        """
        return now() >= self.token_expiry

    def refresh_expiry(self):
        """
        Refresh the expiry time for the token.
        """
        self.token_expiry = now() + timedelta(seconds=3600)
        self.save()

class TransactionBkash(models.Model):
    order = models.ForeignKey(UserOrder, on_delete=models.CASCADE, related_name='bkash_transactions')
    payment_id = models.CharField(max_length=255, unique=True)
    bkash_url = models.URLField()
    callback_url = models.URLField()
    success_callback_url = models.URLField()
    failure_callback_url = models.URLField()
    cancelled_callback_url = models.URLField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_status = models.CharField(max_length=50, default='Initiated')
    merchant_invoice_number = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Transaction {self.payment_id} for Order {self.order.id}"
