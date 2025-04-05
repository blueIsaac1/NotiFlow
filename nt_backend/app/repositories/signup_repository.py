from nt_backend.app.db.supabase import supabase
from fastapi.concurrency import run_in_threadpool # type: ignore

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
        return {
            "created: ", response
        }