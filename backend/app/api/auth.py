import uuid
from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Response, Cookie
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from jose import jwt, JWTError

from app.database import get_db
from app.models import User
from app.core.security import verify_password, get_password_hash, create_access_token, SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter()

class UserCreate(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

async def get_current_user(access_token: str | None = Cookie(default=None), db: AsyncSession = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    if not access_token:
        raise credentials_exception
    try:
        payload = jwt.decode(access_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    result = await db.execute(select(User).filter(User.id == uuid.UUID(user_id)))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user

@router.post("/signup")
async def signup(user_in: UserCreate, response: Response, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.email == user_in.email))
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")
        
    hashed_password = get_password_hash(user_in.password)
    new_user = User(email=user_in.email, hashed_password=hashed_password, name=user_in.name)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(new_user.id)}, expires_delta=access_token_expires
    )
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60, samesite='lax')
    return {"message": "Signup successful", "user": {"id": str(new_user.id), "name": new_user.name, "email": new_user.email}}

@router.post("/login")
async def login(user_in: UserLogin, response: Response, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).filter(User.email == user_in.email))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(user_in.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
        
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60, samesite='lax')
    return {"message": "Login successful", "user": {"id": str(user.id), "name": user.name, "email": user.email}}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logout successful"}
    
@router.get("/me")
async def get_me(current_user: User = Depends(get_current_user)):
    return {"id": str(current_user.id), "name": current_user.name, "email": current_user.email}
