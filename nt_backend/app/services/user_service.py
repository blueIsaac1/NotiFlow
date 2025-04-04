from nt_backend.app.repositories.user_repository import UserRepository
from nt_backend.app.utils.webhook import send_webhook_n8n

class UserService:
    def __init__(self):
        self.repository = UserRepository()

    def get_users(self):
        return self.repository.get_users()
    
    def post_user(self, user_name):
        return self.repository.post_user(user_name)