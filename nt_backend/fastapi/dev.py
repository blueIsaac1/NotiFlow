from fastapi import FastAPI
from nt_backend.db.supabase import supabase
from nt_backend.db.supabase_functions.functions import *
from pydantic import BaseModel
import uuid

app = FastAPI()

@app.get("/")
def main():
    return {200, 'hello world'}

@app.get("/db-notifications")
def db_get_notifications_route():
    return db_get_notifications()

@app.get("/db-users")
def db_get_users_route():
    return db_get_users()

@app.post("/db_insert_notifications")
def db_insert_notifications_route():
    return db_insert_notifications()

@app.post("/db_insert_users")
def db_insert_users_route():
    return db_insert_users()

# @app.on_event("startup")
# async def startup():
#     await supabase.connect()

# @app.on_event("shutdown")
# async def shutdown():
#     await supabase.disconnect()