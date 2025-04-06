from nt_backend.app.db.supabase import supabase
import uuid

class NotificationRepository:
    def get_notification_by_owner(self, owner_id):
        return supabase.table("notifications").select("*").eq("id", owner_id).execute().data
        # for notification in response:
        #     all_notifications = []
        #     all_notifications.append(notification)
        # return all_notifications

    def get_notification_by_id(self, id):
        return supabase.table("notifications").select("*").eq("id", id).execute().data

    def post_notifications(self, title, message, platform, owner_notification, group_notification_id, user_notification_id):
        return supabase.table("notifications").insert({
            "title": title, 
            "message": message, 
            "platform": platform, 
            "owner_notification": owner_notification,
            "group_notification_id": group_notification_id,
            "user_notification_id": user_notification_id
        }).execute().data