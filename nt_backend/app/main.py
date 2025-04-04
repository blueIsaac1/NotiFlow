from fastapi import FastAPI
from nt_backend.app.routes import notifications, users
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(redirect_slashes=False )

origins = [
    "http://localhost:3000",  # Frontend
    "http://localhost:10000", # Backend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(notifications.router, prefix = "/notifications", tags=["Notifications"])
app.include_router(users.router, prefix = "/users", tags=["Users"])