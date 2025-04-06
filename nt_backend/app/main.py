from fastapi import FastAPI, Depends # type: ignore
from nt_backend.app.routes import notifications, users, groups, signin, signup, me
from nt_backend.app.utils.get_token import get_token
from fastapi.middleware.cors import CORSMiddleware # type: ignore

app = FastAPI(redirect_slashes=False )

origins = [
    "http://localhost:3000", # Frontend
    "http://localhost:8000", # Backend
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
app.include_router(groups.router, prefix = "/groups", tags=["Groups"])

app.include_router(signin.router, prefix = "/signin", tags=["SignIn"])
app.include_router(signup.router, prefix = "/signup", tags=["SingUp"])
app.include_router(me.router, prefix = "/me", tags=["Me"])