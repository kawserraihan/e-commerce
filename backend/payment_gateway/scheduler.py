from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.interval import IntervalTrigger
from payment_gateway.bkash import get_or_refresh_token

def schedule_token_refresh():
    # Create a background scheduler
    scheduler = BackgroundScheduler()

    # Schedule the `get_or_refresh_token` function to run every 55 minutes
    scheduler.add_job(
        func=refresh_token_task,
        trigger=IntervalTrigger(minutes=50),
        id="refresh_bkash_token",
        replace_existing=True,  # Replace the existing job if it exists
    )

    print("Bkash token refresh task scheduled.")

    # Start the scheduler in the background
    try:
        scheduler.start()
        print("APScheduler started successfully.")
    except Exception as e:
        print(f"Failed to start APScheduler: {e}")
        scheduler.shutdown()

def refresh_token_task():
    # Wrapper around the get_or_refresh_token function for debugging
    try:
        print("Refreshing Bkash token...")
        token = get_or_refresh_token()
        print(f"Bkash token refreshed successfully. Token: {token}")
    except Exception as e:
        print(f"Failed to refresh Bkash token: {e}")
