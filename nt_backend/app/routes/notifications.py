from fastapi import APIRouter, Depends
from nt_backend.app.services.notification_service import NotificationService

router = APIRouter()

@router.get("/")
def get_notifications(service: NotificationService = Depends()):
    return service.get_notifications()

@router.get("/{id}")
def get_notification(id: str, service: NotificationService = Depends()):
    return service.get_notification(id)

@router.post("/")
def post_notifications(message: str, platform: str, user_id: int, service: NotificationService = Depends()):
    return service.post_notifications(message, platform, user_id)
