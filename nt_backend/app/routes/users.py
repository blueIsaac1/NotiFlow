from fastapi import APIRouter, Depends
from nt_backend.app.services.user_service import UserService

router = APIRouter()

@router.get("/")
def get_users(service: UserService = Depends()):
    return service.get_users()

@router.post("/")
def post_user(user_name: str, service: UserService = Depends()):
    return service.post_user(user_name)
