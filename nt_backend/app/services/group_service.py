from nt_backend.app.repositories.group_repository import GroupRepository

class GroupService:
    def __init__(self):
        self.repository = GroupRepository()

    def get_groups(self):
        return self.repository.get_groups()

    def get_group(self, id):
        return self.repository.get_group(id)
    
    def post_group(self, title, message, platform, owner_nf_id, grou_this_nf_id):
        return self.repository.post_group(title, message, platform, owner_nf_id, grou_this_nf_id)