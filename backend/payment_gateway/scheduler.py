from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.date import DateTrigger
from payment_gateway.bkash import get_or_refresh_token
from payment_gateway.models import BkashToken
from django.utils.timezone import now
from datetime import timedelta

# Global scheduler instance
scheduler = BackgroundScheduler()

def schedule_token_refresh():
    """
    Initializes the scheduler and sets up the first token refresh task.
    Ensures the scheduler is started only once.
    """
    if scheduler.running:  # Prevent duplicate scheduler instances
        print("Scheduler is already running. Skipping initialization.")
        return

    print("Initializing Bkash token refresh scheduler...")

    try:
        # Schedule the first refresh task
        schedule_next_refresh()

        # Start the scheduler
        scheduler.start()
        print("APScheduler started successfully.")
    except Exception as e:
        print(f"Failed to start APScheduler: {e}")
        scheduler.shutdown()

def schedule_next_refresh():
    """
    Dynamically schedules the next token refresh 2 minutes before the token expiry time.
    If no valid token is found, triggers an immediate refresh.
    """
    try:
        # Fetch the current token from the database
        token = BkashToken.objects.first()

        if not token:
            print("No valid token found. Refreshing immediately...")
            refresh_token_task()  # Trigger immediate token refresh
            return

        # Calculate refresh time (2 minutes before expiry)
        refresh_time = token.token_expiry - timedelta(minutes=2)
        print(f"Calculated next refresh time: {refresh_time}")

        # Check if the refresh time is already in the past
        if refresh_time <= (now() + timedelta(hours=6)):
            print("Token is close to expiry or already expired. Refreshing immediately...")
            refresh_token_task()  # Trigger immediate token refresh
            return

        # Schedule the next refresh task
        print(f"Scheduling next token refresh at {refresh_time}.")
        scheduler.add_job(
            func=refresh_token_task,
            trigger=DateTrigger(run_date=refresh_time),
            # trigger=DateTrigger(run_date=now() + timedelta(seconds=240)),
            id="refresh_bkash_token",  # Unique job ID to prevent duplicates
            replace_existing=True,
        )

    except Exception as e:
        print(f"Error scheduling next token refresh: {e}")

def refresh_token_task():
    """
    Refreshes the Bkash token and schedules the next refresh task.
    """
    try:
        print("Refreshing Bkash token...")
        token = get_or_refresh_token()
        print(f"Bkash token refreshed successfully. Token: {token}")

        # After a successful refresh, schedule the next refresh
        schedule_next_refresh()

    except Exception as e:
        print(f"Failed to refresh Bkash token: {e}")
