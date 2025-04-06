from nt_backend.app.repositories.user_repository import UserRepository

class UserService:
    def __init__(self):
        self.repository = UserRepository()

    def get_users_by_group(self, group_id):
        return self.repository.get_users_by_group(group_id)

    def get_users_by_owner(self, owner_id):
        return self.repository.get_users_by_owner(owner_id)

    def get_user(self, user_id):
        return self.repository.get_user(user_id)
    
    def post_user(self, name_user, group_id, owner_id):
        return self.repository.post_user(name_user, group_id, owner_id)