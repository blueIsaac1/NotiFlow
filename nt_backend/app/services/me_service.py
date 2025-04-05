from nt_backend.app.repositories.me_repository import GetMeRepository

class GetMeService:
    def __init__(self):
        self.repository = GetMeRepository()

    async def me(self, jwt):
        return await self.repository.me(jwt)