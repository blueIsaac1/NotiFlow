- Users
    user_id: UUID
    name_user: string
    group_id: FK → group.group_id
    owner_email (ou dashboard_user_id): FK → dashboard_users

- Groups 
    group_id: UUID
    name_group: string
    sector_group: string
    created_at
    dashboard_user_id: FK → dashboard_users

- Notifications
    id: UUID
    title: string
    message: string
    owner_notification: FK → dashboard_users
    group_notification_id: FK → group.group_id (opcional)
    user_notification_id: FK → users.user_id (opcional)
    platform: string (whatsapp, discord, slack, etc.)
    created_at: timestamp
