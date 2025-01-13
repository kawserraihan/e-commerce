import requests
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from payment_gateway.models import BkashToken, TransactionBkash
from products.models import UserOrder  # UserOrder is in Products
import uuid
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt  # Use this decorator to disable CSRF check for this view
@api_view(['POST'])
def create_transaction(request):
    
    try:
        # Retrieve the order ID from the session
        order_id = request.data.get("order_id")  
        if not order_id:
            return JsonResponse({"error": "Order ID not found in session."}, status=400)

        # Fetch the order and total amount
        order = get_object_or_404(UserOrder, id=order_id)
        total_amount = order.total_amount
        print(f"Order {order.id} fetched with total amount: {total_amount}")

        # Generate a unique merchant invoice number
        merchant_invoice_number = f"INV-{uuid.uuid4().hex[:8].upper()}"
        print(f"Generated merchant invoice number: {merchant_invoice_number}")

        # Fetch the grant token from the database
        bkash_token = BkashToken.objects.first()
        if not bkash_token:
            return JsonResponse({"error": "Bkash token is not valid. Please refresh the token."}, status=400)

        # Prepare the Create Payment API request
        url = settings.BKASH_CREATE_PAYMENT_URL
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {bkash_token.grant_token}",
            "X-App-Key": settings.BKASH_APP_KEY,
        }
        payload = {
            "mode": "0011",  # Fixed mode for one-time payments
            "payerReference": "01",  # Fixed reference as per requirements
            "callbackURL": settings.BKASH_CALLBACK_URL,  # Dynamic callback URL
            "amount": str(total_amount),  # Amount from the order
            "currency": "BDT",
            "intent": "sale",  # Fixed intent
            "merchantInvoiceNumber": merchant_invoice_number,
        }

        # Make the API call to Bkash
        print(f"Sending request to Bkash Create Payment API: {url}")
        response = requests.post(url, json=payload, headers=headers)
        data = response.json()

        if response.status_code == 200 and data.get("statusCode") == "0000":
            print("Bkash Create Payment API call successful.")
            
            # Save the transaction in the database
            transaction = TransactionBkash.objects.create(
                order=order,
                payment_id=data["paymentID"],
                bkash_url=data["bkashURL"],
                callback_url=data["callbackURL"],
                success_callback_url=data["successCallbackURL"],
                failure_callback_url=data["failureCallbackURL"],
                cancelled_callback_url=data["cancelledCallbackURL"],
                total_amount=total_amount,
                transaction_status=data["transactionStatus"],
                merchant_invoice_number=merchant_invoice_number,
            )
            return JsonResponse(
                {"message": "Transaction created successfully.", "bkash_url": transaction.bkash_url},
                status=200,
            )
        else:
            error_message = data.get("statusMessage", "Failed to create payment.")
            print(f"Bkash API Error: {error_message}")
            return JsonResponse({"error": error_message}, status=400)

    except Exception as e:
        print(f"Error creating transaction: {e}")
        return JsonResponse({"error": "An error occurred while creating the transaction."}, status=500)
