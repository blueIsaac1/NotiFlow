from fastapi import APIRouter, Depends
from nt_backend.app.services.auth_service import AuthUserRepository

router = APIRouter()

@router.post("/")
def login_auth(auth_email:str, auth_password: str, service: AuthUserRepository = Depends()):
    return service.login_auth(auth_email, auth_password)
