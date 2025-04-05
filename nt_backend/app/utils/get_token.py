from fastapi import Request, HTTPException, Depends # type:ignore

def get_token(request: Request):
    token = request.headers.get("authorization")
    if not token or not token.startwith("Bearer "):
        raise HTTPException(status_code=401, detail="Token inválido")
    return token.split(" ")[1]