import os
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.models import Base

# By default assume a local docker setup or provided url
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+asyncpg://resume_user:resume_password@localhost/resume_db")

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False)

async def get_db():
    async with AsyncSessionLocal() as session:
        yield session
