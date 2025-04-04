from nt_backend.app.repositories.notification_repository import NotificationRepository
from nt_backend.app.utils.webhook import send_webhook_n8n

class NotificationService:
    def __init__(self):
        self.repository = NotificationRepository()

    def get_notifications(self):
        return self.repository.get_notifications()

    def get_notification(self, id):
        return self.repository.get_notification(id)
    
    def post_notifications(self, message, platform, user_id):
        send_webhook_n8n(platform)
        return self.repository.post_notifications(message, platform, user_id)