from nt_backend.app.repositories.signin_repository import SignInRepository

class SignInService:
    def __init__(self):
        self.repository = SignInRepository()
    
    async def sign_in(self, auth_email, auth_password): 
        return await self.repository.sign_in(auth_email, auth_password)
    