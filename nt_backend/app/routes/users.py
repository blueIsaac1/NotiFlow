from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.user_service import UserService

router = APIRouter()

@router.get("/")
def get_users(service: UserService = Depends()):
    return service.get_users()

@router.get("/{user_id}")
def get_user(user_id: int, service: UserService = Depends()):
    return service.get_user(user_id)

@router.post("/")
def post_user(user_name: str, service: UserService = Depends()):
    return service.post_user(user_name)
