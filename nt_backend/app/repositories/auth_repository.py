from nt_backend.app.db.supabase import supabase
from fastapi import HTTPException

class AuthUserRepository:
    def login_auth(self, auth_email, auth_password):

        result = supabase.table("auth_login").select("*").eq("auth_email", auth_email).eq("auth_password", auth_password).single().execute()
        print(result)
        if not result:
            raise HTTPException(status_code=401, detail="Email ou senha inválidos")
        
        return result

        # return {
        #     # "access_token": result.session.access_token,
        #     # "refresh_token": result.session.refresh_token,
        #     "user": {
        #         "id": result.data_user.auth_id,
        #         "email": result.data_user.auth_email
        #     }
        # }



# auth.sign_in_with_password({
#                 "auth_email": auth_email, 
#                 "auth_password": auth_password
#             })