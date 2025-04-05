from fastapi import APIRouter, Depends, Request # type: ignore
from nt_backend.app.services.me_service import GetMeService
from nt_backend.app.utils.get_token import get_token

router = APIRouter()

@router.get("/")
async def me(jwt: str = Depends(get_token), service: GetMeService = Depends()):
    return await service.me(jwt)