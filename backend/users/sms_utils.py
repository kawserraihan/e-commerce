import requests
from django.conf import settings


def send_sms(phone_number, message):
    url = "https://api.smsmode.com/http/1.6/sendSMS.do"
    payload = {
        'accessToken': settings.SMSMODE_ACCESS_TOKEN,
        'numero': phone_number,
        'message': message,
        # 'stop': '1'  # Optional: to add a STOP SMS clause
    }
    response = requests.get(url, params=payload)
    if response.status_code == 200:
        return response.json()
    else:
        return None