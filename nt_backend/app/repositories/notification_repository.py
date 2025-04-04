from nt_backend.app.db.supabase import supabase
import uuid

class NotificationRepository:
    def get_notifications(self):
        return supabase.table("notifications").select("*").execute().data

    def post_notifications(self, message, platform, user_id):
        return supabase.table("notifications").insert({
            "id": str(uuid.uuid4()), "message": message, "platform": platform, "user_id": user_id
        }).execute().data