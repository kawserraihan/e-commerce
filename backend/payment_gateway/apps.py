from django.apps import AppConfig
import os

class PaymentGatewayConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "payment_gateway"

    def ready(self):
        if os.environ.get("RUN_MAIN") == "true":  # Avoid duplicate runs
            from payment_gateway.scheduler import schedule_token_refresh
            schedule_token_refresh()
            print("Bkash token scheduler initialized.")
