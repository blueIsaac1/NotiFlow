from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.user_service import UserService

router = APIRouter()

@router.get("/{group_id}")
def get_users_by_group(group_id: str, service: UserService = Depends()):
    return service.get_users_by_group(group_id)

@router.get("/{owner_id}")
def get_users_by_owner(owner_id: str, service: UserService = Depends()):
    return service.get_users_by_owner(owner_id)

@router.get("/{user_id}")
def get_user(user_id: str, service: UserService = Depends()):
    return service.get_user(user_id)

@router.post("/")
def post_user(name_user: str, group_id: str, owner_id: str, service: UserService = Depends()):
    return service.post_user(name_user, group_id, owner_id)
