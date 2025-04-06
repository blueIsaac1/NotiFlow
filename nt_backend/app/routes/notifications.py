from fastapi import APIRouter, Depends # type: ignore
from nt_backend.app.services.notification_service import NotificationService
from typing import Optional

router = APIRouter()

@router.get("/{owner_id}")
def get_notification_by_owner(owner_id: str, service: NotificationService = Depends()):
    return service.get_notification_by_owner(owner_id)

@router.get("/{id}")
def get_notification_by_id(id: str, service: NotificationService = Depends()):
    return service.get_notification_by_id(id)

@router.post("/")
def post_notifications(title: str, message: str, platform: str, owner_notification: str, group_notification_id: Optional[str] = None, user_notification_id: Optional[str] = None, service: NotificationService = Depends()):
    return service.post_notifications(title, message, platform, owner_notification, group_notification_id, user_notification_id)

# Mensagem referente ao teste feito no campo de notificações
# 26aaf65f-e1bf-4853-aea4-38bb7abafabc
# c6fddb76-c0e3-4c28-bc53-aa607a49954a