from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.signup_service import SignUpRepository

router = APIRouter()

@router.post("/")
async def sign_up(auth_email:str, auth_password: str, service: SignUpRepository = Depends()):
    return await service.sign_up(auth_email, auth_password)
