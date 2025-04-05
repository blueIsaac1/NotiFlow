from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.group_service import GroupService

router = APIRouter()

@router.get("/")
def get_groups(service: GroupService = Depends()):
    return service.get_groups()

@router.get("/{id}")
def get_group(id: str, service: GroupService = Depends()):
    return service.get_group(id)

@router.post("/")
def post_groups(title: str, message: str, platform: str, owner_nf_id: str, grou_this_nf_id: int, service: GroupService = Depends()):
    return service.post_groups(title, message, platform, owner_nf_id, grou_this_nf_id)
