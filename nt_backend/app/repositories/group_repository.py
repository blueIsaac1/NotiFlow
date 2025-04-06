from nt_backend.app.db.supabase import supabase

class GroupRepository:
    def get_groups_by_owner(self, owner_id):
        return supabase.table("groups").select("*").eq("dashboard_user_id", owner_id).execute().data

    def get_group(self, group_id):
        return supabase.table("groups").select("*").eq("group_id", group_id).execute().data

    def post_group(self, name_group, sector_group, dashboard_user_id):
        return supabase.table("groups").insert({
            "name_group": name_group,
            "sector_group": sector_group,
            "dashboard_user_id": dashboard_user_id,
        }).execute().data