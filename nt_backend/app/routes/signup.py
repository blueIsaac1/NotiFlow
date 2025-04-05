from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.signup_service import SignUpRepository

router = APIRouter()

@router.post("/")
def sign_up(auth_email:str, auth_password: str, service: SignUpRepository = Depends()):
    return service.sign_up(auth_email, auth_password)
