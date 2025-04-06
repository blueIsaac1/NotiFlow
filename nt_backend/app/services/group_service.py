from nt_backend.app.repositories.group_repository import GroupRepository

class GroupService:
    def __init__(self):
        self.repository = GroupRepository()

    def get_groups_by_owner(self, owner_id):
        return self.repository.get_groups(owner_id)

    def get_group(self, group_id):
        return self.repository.get_group(group_id)
    
    def post_group(self, name_group, sector_group, dashbord_user_id):
        return self.repository.post_group(name_group, sector_group, dashbord_user_id)