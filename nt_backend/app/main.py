from fastapi import FastAPI
from nt_backend.app.routes import notifications, users

app = FastAPI()

app.include_router(notifications.router, prefix = "/notifications", tags=["Notifications"])
app.include_router(users.router, prefix = "/users", tags=["Users"])