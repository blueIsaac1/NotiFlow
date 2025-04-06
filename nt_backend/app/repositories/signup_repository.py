from nt_backend.app.db.supabase import supabase
from fastapi.concurrency import run_in_threadpool # type: ignore
import uuid

class SignUpRepository:
    async def sign_up(self, auth_email, auth_password):
        def sync_sing_up():
            return supabase.auth.sign_up(
                {
                    "email": auth_email,
                    "password": auth_password
                }
            )
        
        response = await run_in_threadpool(sync_sing_up)

        if not response or not response.user:
            return {"error": "Erro ao criar usuário no auth"}

        owner_id = response.user.id

        def sync_sign_up_dashboard_users():
            return supabase.table("dashboard_users").insert(
                {
                "id": owner_id,
                "email": auth_email,
                }
            ).execute().data
        
        response2 = await run_in_threadpool(sync_sign_up_dashboard_users)
        print("r1: ", response)
        print("r2: ", response2)

        return {
            "created auth_user": response,
            "created dashboard_user": response2
        }