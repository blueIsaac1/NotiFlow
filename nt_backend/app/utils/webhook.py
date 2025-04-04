import requests, os

def send_webhook_n8n(platform):
    url = os.getenv("N8N_URL_POST")
    data = {"Platform": str(platform)}
    response = requests.post(url, data=data)
    return response