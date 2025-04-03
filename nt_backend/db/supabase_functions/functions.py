from nt_backend.db.supabase import supabase
import uuid

def db_get_notifications():
    response = supabase.table("notifications").select("*").execute()
    return response.data

def db_get_users():
    response = supabase.table("users").select("*").execute()
    return response.data

def db_insert_notifications():
    response = supabase.table("notifications").insert({
        "id": str(uuid.uuid4()), "message": "uma notificação"}).execute()
    return response.data

def db_insert_users():
    response = supabase.table("users").insert({
        "name_user": "Isaac"}).execute()