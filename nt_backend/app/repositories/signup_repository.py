from nt_backend.app.db.supabase import supabase

class SignUpRepository:
    def singup(self, auth_username, auth_email, auth_password):
        return supabase.table("auth_login").insert({
            "auth_username": auth_username,
            "auth_email": auth_email,
            "auth_password": auth_password
        }).execute().data