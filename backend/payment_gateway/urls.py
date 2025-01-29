from django.urls import path
from payment_gateway.views import create_transaction, execute_payment, get_order_details, update_order_status, get_order_details_by_id

urlpatterns = [
    path("transactions/bkash/", create_transaction, name="create_transaction"),
    path("execute-payment/", execute_payment, name="execute_payment"),
    path("order-details/", get_order_details, name="get_order_details"),
    path("update-order-status/", update_order_status, name="update_order_status"),
    path("order-details-by-id/", get_order_details_by_id, name="get_order_details_by_id"),    
]