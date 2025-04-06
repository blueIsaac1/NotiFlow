from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.group_service import GroupService

router = APIRouter()

@router.get("/owner/{owner_id}")
def get_groups_by_owner(owner_id: str, service: GroupService = Depends()):
    return service.get_groups_by_owner(owner_id)

@router.get("/{group_id}")
def get_group(group_id: str, service: GroupService = Depends()):
    return service.get_group(group_id)

@router.post("/")
def post_group(name_group: str, sector_group: str, dashboard_user_id: str, service: GroupService = Depends()):
    return service.post_group(name_group, sector_group, dashboard_user_id)
