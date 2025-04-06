from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.group_service import GroupService

router = APIRouter()

@router.get("/{owner_id}")
def get_groups_by_owner(owner_id: str, service: GroupService = Depends()):
    return service.get_groups_by_owner(owner_id)

@router.get("/{group_id}")
def get_group(group_id: str, service: GroupService = Depends()):
    return service.get_group(group_id)

@router.post("/")
def post_groups(name_group: str, sector_group: str, dashbord_user_id: str, service: GroupService = Depends()):
    return service.post_groups(name_group, sector_group, dashbord_user_id)
