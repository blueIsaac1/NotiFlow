import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

# def db_get_notifications():
#     response = supabase.table("notifications").select("*").execute()
#     return response.data

# def db_get_users():
#     response = supabase.table("users").select("*").execute()
#     return response.data

# def db_insert_notifications(message, platform, user_id):
#     response = supabase.table("notifications").insert({
#         "id": str(uuid.uuid4()), "message": message, "platform": platform, "user_id": user_id}).execute()
#     return response.data

# def db_insert_users(name_user):
#     response = supabase.table("users").insert({
#         "name_user": name_user}).execute()
#     return response.data

# def send_webhook_n8n(platform):
#     url = os.getenv("N8N_URL_POST")
#     data = {"Platform": str(platform)}
#     response = requests.post(url, data=data)
#     return response

# @app.get("/")
# def main():
#     return {200, 'hello world'}

# @app.get("/db-notifications")
# def db_get_notifications_route():
#     return db_get_notifications()

# @app.get("/db-users")
# def db_get_users_route():
#     return db_get_users()

# @app.post("/db_insert_notifications")
# def db_insert_notifications_route(message, platform, user_id):
#     send_webhook_n8n(platform=platform)
#     return db_insert_notifications(message, platform, user_id)

# @app.post("/db_insert_users")
# def db_insert_users_route(name_user):
#     return db_insert_users(name_user)