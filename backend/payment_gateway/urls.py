from django.urls import path
from payment_gateway.views import create_transaction

urlpatterns = [
    path("transactions/bkash/", create_transaction, name="create_transaction"),
]