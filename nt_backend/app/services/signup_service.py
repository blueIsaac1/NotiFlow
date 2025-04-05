from nt_backend.app.repositories.signup_repository import SignUpRepository

class SignUpervice:
    def __init__(self):
        self.repository = SignUpRepository()
    
    def signup(self, auth_username, auth_email, auth_password): 
        return self.repository.signup(auth_username, auth_email, auth_password)