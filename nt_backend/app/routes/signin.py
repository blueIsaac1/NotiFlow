from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.signin_service import SignInService

router = APIRouter()

@router.post("/")
async def asyncsign_in(auth_email:str, auth_password: str, service: SignInService = Depends()):
    return await service.sign_in(auth_email, auth_password)
