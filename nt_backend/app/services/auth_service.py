from nt_backend.app.repositories.auth_repository import AuthUserRepository

class AuthUserService:
    def __init__(self):
        self.repository = AuthUserRepository()
    
    def login_auth(self, auth_email, auth_password): 
        return self.repository.login_auth(auth_email, auth_password)