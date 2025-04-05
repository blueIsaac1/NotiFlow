from fastapi import APIRouter, Depends
from nt_backend.app.services.signup_service import SignUpRepository

router = APIRouter()

@router.post("/")
def signup(auth_username: str, auth_email:str, auth_password: str, service: SignUpRepository = Depends()):
    return service.singup(auth_username, auth_email, auth_password)
