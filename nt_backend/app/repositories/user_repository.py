from nt_backend.app.db.supabase import supabase
import uuid

class UserRepository:
    def get_users(self):
        return supabase.table("users").select("*").execute().data

    def post_user(self, name_user):
        return supabase.table("users").insert({
            "name_user": name_user
        }).execute().data