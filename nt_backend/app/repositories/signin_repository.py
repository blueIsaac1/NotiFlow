from nt_backend.app.db.supabase import supabase
from fastapi.concurrency import run_in_threadpool # type: ignore

class SignInRepository:
    async def sign_in(self, auth_email, auth_password):
        def sync_signin():
            return supabase.auth.sign_in_with_password(
                {
                    "email": auth_email,
                    "password": auth_password
                }
            )
        response = await run_in_threadpool(sync_signin)
        return {
            "user_id": response.user.id,
            "access_token": response.session.access_token,
            "refresh_token": response.session.refresh_token,
        }