from nt_backend.app.repositories.notification_repository import NotificationRepository
from nt_backend.app.utils.webhook import send_webhook_n8n

class NotificationService:
    def __init__(self):
        self.repository = NotificationRepository()

    def get_notification_by_owner(self, owner_id):
        return self.repository.get_notification_by_owner(owner_id)
    
    def get_notification_by_id(self, id):
        return self.repository.get_notification_by_id(id)

    def post_notifications(self, title, message, platform, owner_id, group_notification_id, user_notification_id):
        send_webhook_n8n(platform)
        return self.repository.post_notifications(title, message, platform, owner_id, group_notification_id, user_notification_id)