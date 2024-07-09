from datetime import datetime, timedelta
import requests

from django.conf import settings


def format_time_range(times):
    if not times:
        return ""

    # Parse the first time in the list
    start_time = datetime.strptime(times[0], "%H:%M")

    # Determine the end time by adding the number of time entries to the start time
    end_time = start_time + timedelta(hours=len(times))

    # If end_time goes past midnight, adjust it
    if end_time.day > start_time.day:
        end_time = end_time.replace(day=start_time.day)

    # Format the start and end times back to string
    start_time_str = start_time.strftime("%H:%M")
    end_time_str = end_time.strftime("%H:%M")

    return f"{start_time_str} - {end_time_str}"

def eskiz_authorization():
    data = {
        'email': settings.ESKIZ_EMAIL,
        'password': settings.ESKIZ_PASSWORD,
    }

    AUTHORIZATION_URL = 'http://notify.eskiz.uz/api/auth/login'

    r = requests.request('POST', AUTHORIZATION_URL, data=data)
    if r.json()['data']['token']:
        return r.json()['data']['token']
    else:
        return 'FAILED'

def send_sms_verification_code(phone_number, verification_code):
    message = f'\nКод подвреждения в для Spint: {verification_code}.\nНикому не сообщайте этот код.'

    token = eskiz_authorization()
    if token == 'FAILED':
        return 'FAILED'

    SEND_SMS_URL = "http://notify.eskiz.uz/api/message/sms/send"

    PAYLOAD = {
        'mobile_phone': str(phone_number),
        'message': "Bu Eskiz dan test",
        'from': '4546'
    }
    FILES = []
    HEADERS = {
        'Authorization': f'Bearer {token}'
    }
    r = requests.request("POST", SEND_SMS_URL, headers=HEADERS, data=PAYLOAD, files=FILES)
    print(HEADERS, PAYLOAD)
    print(r.json())
    return verification_code