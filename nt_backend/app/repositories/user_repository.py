from nt_backend.app.db.supabase import supabase

class UserRepository:
    def get_users_by_group(self):
        return supabase.table("users").select("*").eq("group_id").execute().data
    
    def get_users_by_owner(self):
        return supabase.table("users").select("*").eq("owner_id").execute().data

    def get_user(self, user_id):
        return supabase.table("users").select("*").eq("user_id", user_id).execute().data

    def post_user(self, group_id, owner_id, name_user):
        return supabase.table("users").insert({
            "name_user": name_user,
            "group_id": group_id, 
            "owner_id": owner_id
        }).execute().data