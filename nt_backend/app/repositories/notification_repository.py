from nt_backend.app.db.supabase import supabase
import uuid

class NotificationRepository:
    def get_notifications(self):
        return supabase.table("notifications").select("*").execute().data

    def get_notification(self, id):
        return supabase.table("notifications").select("*").eq("id", str(id)).execute().data

    def post_notifications(self, title, message, platform, owner_nf_id, grou_this_nf_id):
        return supabase.table("notifications").insert({
            "nf_id": str(uuid.uuid4()), 
            "title": title, 
            "message": message, 
            "platform": platform, 
            "owner_nf_id": owner_nf_id,
            "grou_this_nf_id": grou_this_nf_id
        }).execute().data