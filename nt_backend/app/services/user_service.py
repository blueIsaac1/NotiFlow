from nt_backend.app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self):
        self.repository = UserRepository()

    def get_users(self):
        return self.repository.get_users()

    def get_user(self, user_id):
        return self.repository.get_user(user_id)
    
    def post_user(self, user_name):
        return self.repository.post_user(user_name)