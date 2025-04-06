from nt_backend.app.repositories.signup_repository import SignUpRepository

class SignUpService:
    def __init__(self):
        self.repository = SignUpRepository()
    
    async def sign_up(self, auth_email, auth_password): 
        return await self.repository.sign_up(auth_email, auth_password)