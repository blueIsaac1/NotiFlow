from nt_backend.app.db.supabase import supabase
import uuid

class GroupRepository:
    def get_groups(self):
        return supabase.table("groups").select("*").execute().data

    def get_group(self, group_id):
        return supabase.table("groups").select("*").eq("group_id", group_id).execute().data

    def post_group(self, title, message, platform, owner_nf_id, grou_this_nf_id):
        return supabase.table("groups").insert({
            "group_id": str(uuid.uuid4()), 
            "title": title, 
            "message": message, 
            "platform": platform,  
            "owner_nf_id": owner_nf_id,
            "grou_this_nf_id": grou_this_nf_id
        }).execute().data