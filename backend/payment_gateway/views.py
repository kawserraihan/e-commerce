import requests
from django.conf import settings
from django.http import JsonResponse
import json
from django.shortcuts import get_object_or_404
from django.utils.timezone import now
from payment_gateway.models import BkashToken, TransactionBkash
from products.models import UserOrder  # UserOrder is in Products
import uuid
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from delivery_system.models import DeliveryInfo

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

@csrf_exempt  # Use this decorator to disable CSRF check for this view
@api_view(['POST'])
def execute_payment(request):
    """
    Handles Bkash payment execution.
    If the same paymentID is provided in a second attempt, it returns a success response.
    """
    try:
        if request.method != "POST":
            return JsonResponse({"error": "Invalid HTTP method. Only POST is allowed."}, status=405)

        # Parse the request body
        try:
            body = json.loads(request.body)
            payment_id = body.get("paymentID")
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON body."}, status=400)

        if not payment_id:
            return JsonResponse({"error": "PaymentID is required."}, status=400)

        # Get the Bkash token
        bkash_token = BkashToken.objects.first()
        if not bkash_token:
            return JsonResponse({"error": "Bkash token not found. Please refresh the token."}, status=404)

        # Fetch the transaction
        transaction = TransactionBkash.objects.filter(payment_id=payment_id).first()
        if not transaction:
            return JsonResponse({"error": "Transaction not found."}, status=404)

        # Check if the transaction is already completed
        if transaction.transaction_status == "Completed":
            print(f"Transaction with paymentID={payment_id} has already been completed.")
            return JsonResponse({"message": "Payment already executed successfully."}, status=200)

        # Call the Bkash Execute API
        url = settings.BKASH_EXECUTE_PAYMENT_URL
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": f"Bearer {bkash_token.grant_token}",
            "X-App-Key": settings.BKASH_APP_KEY,
        }
        payload = {"paymentID": payment_id}

        print(f"Calling Execution API for paymentID={payment_id}")
        response = requests.post(url, json=payload, headers=headers)

        # Check API response
        try:
            data = response.json()
        except ValueError:
            return JsonResponse({"error": "Invalid response from Bkash API."}, status=500)

        if response.status_code == 200 and data.get("statusCode") == "0000":
            print("Bkash Execution API call successful.")

            # Update the transaction status
            transaction.transaction_status = "Completed"
            transaction.save()

            # Update the order payment status
            order = transaction.order
            order.payment_status = "Paid"
            order.save()

            return JsonResponse({"message": "Payment executed successfully."}, status=200)
        else:
            error_message = data.get("statusMessage", "Execution API call failed")
            print(f"Bkash API Error: {error_message}")
            return JsonResponse({"error": error_message}, status=400)

    except Exception as e:
        print(f"Error in execute_payment: {e}")
        return JsonResponse({"error": "An error occurred while processing the payment."}, status=500)


def get_order_details(request):
    if request.method == "GET":
        payment_id = request.GET.get("paymentID")

        if not payment_id:
            return JsonResponse({"error": "Payment ID is required"}, status=400)

        try:
            # Fetch the TransactionBkash instance
            transaction = TransactionBkash.objects.select_related("order").get(payment_id=payment_id)
            order = transaction.order  # Associated order

            # Fetch all related delivery information for the order
            delivery_infos = DeliveryInfo.objects.filter(order=order)

            # Prepare order details
            order_details = {
                "order_id": order.id,
                "order_date": order.created_at.strftime("%Y-%m-%d"),
                "payment_status": order.payment_status,
                "delivery_status": order.delivery_status,
                "payment_method": order.payment_method,
                "total_amount": float(order.total_amount),  # Convert Decimal to float
                "amount_paid": float(order.amount_paid),
                "items": [
                    {
                        "product_name": item.product.product_name,
                        "product_image": item.product.product_image.url if item.product.product_image else None,
                        "quantity": item.quantity,
                        "price": float(item.price),
                        "total_price": float(item.total_price),
                    }
                    for item in order.items.all()  # Fetch all related items using 'items'
                ],
                "delivery_info": [
                    {
                        "full_name": info.full_name,
                        "email": info.email,
                        "phone": info.phone,
                        "alt_phone": info.alt_phone,
                        "address": info.address,
                        "city": info.city,
                        "note": info.note,
                        "coupon": info.coupon,
                        "created_at": info.created_at.strftime("%Y-%m-%d %H:%M:%S"),
                    }
                    for info in delivery_infos  # Loop through all related DeliveryInfo objects
                ],
            }
            return JsonResponse(order_details, status=200)
        except TransactionBkash.DoesNotExist:
            return JsonResponse({"error": "Invalid Payment ID"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=405)

@csrf_exempt
def update_order_status(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            payment_id = data.get("paymentID")
            payment_status = data.get("status")  # "success" or "failed"

            if not payment_id or not payment_status:
                return JsonResponse({"error": "Payment ID and status are required"}, status=400)

            # Fetch the transaction and associated order
            transaction = TransactionBkash.objects.select_related("order").get(payment_id=payment_id)
            order = transaction.order

            if payment_status == "success":
                # Update the order details
                order.amount_paid = order.total_amount
                order.payment_status = "paid"
                order.payment_method = "bkash"
                order.save()

                # Update transaction status
                transaction.transaction_status = "Completed"
                transaction.save()

                return JsonResponse({"message": "Order updated successfully", "status": "success"}, status=200)
            else:
                # If payment failed, update transaction status
                transaction.transaction_status = "Failed"
                transaction.save()

                return JsonResponse({"message": "Payment failed", "status": "failed"}, status=200)

        except TransactionBkash.DoesNotExist:
            return JsonResponse({"error": "Invalid Payment ID"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Invalid request method"}, status=405)

def get_order_details_by_id(request):
    if request.method == "GET":
        order_id = request.GET.get("order_id")
        if not order_id:
            return JsonResponse({"error": "Order ID is required"}, status=400)

        try:
            order = UserOrder.objects.prefetch_related("items", "checkout_info").get(id=order_id)
            order_details = {
                "order_id": order.id,
                "order_date": order.created_at.strftime("%Y-%m-%d"),
                "payment_status": order.payment_status,
                "delivery_status": order.delivery_status,
                "payment_method": order.payment_method,
                "total_amount": float(order.total_amount),  # Convert Decimal to float
                "amount_paid": float(order.amount_paid),
                "items": [
                    {
                        "product_name": item.product.product_name,
                        "product_image": item.product.product_image.url if item.product.product_image else None,
                        "quantity": item.quantity,
                        "price": float(item.price),
                        "total_price": float(item.total_price),
                    }
                    for item in order.items.all()
                ],
                "delivery_info": [
                    {
                        "full_name": info.full_name,
                        "address": info.address,
                        "email": info.email,
                        "phone": info.phone,
                    }
                    for info in order.checkout_info.all()
                ],
            }
            return JsonResponse(order_details, status=200)
        except UserOrder.DoesNotExist:
            return JsonResponse({"error": "Order not found"}, status=404)
