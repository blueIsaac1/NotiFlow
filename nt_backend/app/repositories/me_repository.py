from nt_backend.app.db.supabase import supabase
from fastapi.concurrency import run_in_threadpool # type: ignore
from fastapi import Request, HTTPException # type: ignore
from nt_backend.app.utils.get_token import get_token

class GetMeRepository:
    async def me(self, jwt):
        def sync_me():
            return supabase.auth.get_user(jwt)
        response = await run_in_threadpool(sync_me)
        return response.user