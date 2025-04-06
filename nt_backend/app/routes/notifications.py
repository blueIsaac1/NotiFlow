from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.notification_service import NotificationService

router = APIRouter()

@router.get("/{owner_id}")
def get_notification_by_owner(owner_id: str, service: NotificationService = Depends()):
    return service.get_notification_by_owner(owner_id)

@router.get("/{id}")
def get_notification_by_id(id: str, service: NotificationService = Depends()):
    return service.get_notification_by_id(id)

@router.post("/")
def post_notifications(title: str, message: str, platform: str, owner_id: str, group_notification_id: str, user_notification_id: str, service: NotificationService = Depends()):
    return service.post_notifications(title, message, platform, owner_id, group_notification_id, user_notification_id)
