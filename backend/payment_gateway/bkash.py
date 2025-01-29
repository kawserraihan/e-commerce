import requests
from django.utils.timezone import now, timedelta
from .models import BkashToken
from django.conf import settings

def get_or_refresh_token():
    try:
        print("Starting Bkash token refresh task...")
        token = BkashToken.objects.first()

        # Check if the token exists
        if token:
            # Refresh token if it will expire in less than 5 minutes
                        # Debug: Print token details
            print(f"Current Token in DB: {token}")
            print(f"Token Expiry: {token.token_expiry}")

            time_to_expiry = (token.token_expiry - (now()+ timedelta(hours=6) )).total_seconds()
            print(f"Time to Expiry (seconds): {time_to_expiry}")
            if time_to_expiry > 60:
                print(f"Bkash token is valid for another {time_to_expiry} seconds.")
                return token.grant_token
            else:
                print("Bkash token is about to expire. Refreshing...")
                return refresh_token(token.refresh_token)

        # If no token exists, generate a new one
        print("No Bkash token found. Generating a new one...")
        return grant_new_token()

    except Exception as e:
        print(f"Failed to get or refresh Bkash token: {e}")
        raise

def grant_new_token():
    try:
        print("Requesting a new Bkash token...")
        url = settings.BKASH_GRANT_URL
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": settings.BKASH_USERNAME,
            "password": settings.BKASH_PASSWORD,
        }
        payload = {
            "app_key": settings.BKASH_APP_KEY,
            "app_secret": settings.BKASH_APP_SECRET,
        }

        print(f"Grant Token Headers: {headers}")
        print(f"Grant Token Payload: {payload}")


        response = requests.post(url, json=payload, headers=headers)
        
        print(f"Grant Token Response Status Code: {response.status_code}")
        print(f"Grant Token Response JSON: {response.json()}")

        data = response.json()

        if response.status_code == 200 and data.get("statusCode") == "0000":
            print("New Bkash token granted successfully.")
            token = BkashToken.objects.create(
                grant_token=data["id_token"],
                refresh_token=data["refresh_token"],
                # token_expiry=now() + timedelta(seconds=data["expires_in"]) + timedelta(hours=6)
                token_expiry= (now() + timedelta(hours=6)) + timedelta(minutes=4),  # Expiry set to 3 minutes

            )
            print(f"Saved Token to DB: {token}")
            return token.grant_token
        else:
            print(f"Failed to grant new Bkash token: {data.get('statusMessage')}")
            raise Exception(f"Bkash API Error: {data.get('statusMessage')}")

    except Exception as e:
        print(f"Error in grant_new_token: {e}")
        raise

def refresh_token(refresh_token_value):
    try:
        print("Refreshing Bkash token using refresh token...")
        print(f"Using Refresh Token: {refresh_token_value}")

        url = settings.BKASH_REFRESH_URL
        headers = {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "username": settings.BKASH_USERNAME,
            "password": settings.BKASH_PASSWORD,
        }
        payload = {
            "app_key": settings.BKASH_APP_KEY,
            "app_secret": settings.BKASH_APP_SECRET,
            "refresh_token": refresh_token_value,
        }

        print(f"Refresh Token Headers: {headers}")
        print(f"Refresh Token Payload: {payload}")

        response = requests.post(url, json=payload, headers=headers)

        print(f"Refresh Token Response Status Code: {response.status_code}")
        print(f"Refresh Token Response JSON: {response.json()}")

        data = response.json()

        if response.status_code == 200 and data.get("statusCode") == "0000":
            print("Bkash token refreshed successfully.")
            token = BkashToken.objects.first()
            token.grant_token = data["id_token"]
            token.refresh_token = data["refresh_token"]
            token.token_expiry = now() + timedelta(seconds=data["expires_in"]) + timedelta(hours=6)
            token.save()

            print(f"Updated Token in DB: {token}")
            
            return token.grant_token
        else:
            print(f"Failed to refresh Bkash token: {data.get('statusMessage')}")
            raise Exception(f"Bkash API Error: {data.get('statusMessage')}")

    except Exception as e:
        print(f"Error in refresh_token: {e}")
        raise
