import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from app.database import get_db
from app.models import Resume, User, Template
from app.schemas.resume import ResumeData
from app.api.auth import get_current_user

router = APIRouter()

class ResumeCreate(BaseModel):
    title: str = "Untitled Resume"
    template_id: str
    data: ResumeData

class ResumeUpdate(BaseModel):
    title: str | None = None
    template_id: str | None = None
    data: ResumeData | None = None

@router.post("/", response_model=dict)
async def create_resume(resume_in: ResumeCreate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    new_resume = Resume(
        user_id=current_user.id,
        title=resume_in.title,
        template_id=resume_in.template_id,
        data=resume_in.data.model_dump()
    )
    db.add(new_resume)
    await db.commit()
    await db.refresh(new_resume)
    return {"id": str(new_resume.id)}

@router.get("/", response_model=list)
async def list_resumes(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Resume).filter(Resume.user_id == current_user.id))
    resumes = result.scalars().all()
    return [{"id": str(r.id), "title": r.title, "template_id": r.template_id, "updated_at": r.updated_at} for r in resumes]

@router.get("/{resume_id}", response_model=dict)
async def get_resume(resume_id: uuid.UUID, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id))
    resume = result.scalar_one_or_none()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return {
        "id": str(resume.id),
        "title": resume.title,
        "template_id": resume.template_id,
        "data": resume.data
    }

@router.patch("/{resume_id}", response_model=dict)
async def update_resume(resume_id: uuid.UUID, resume_in: ResumeUpdate, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(Resume).filter(Resume.id == resume_id, Resume.user_id == current_user.id))
    resume = result.scalar_one_or_none()
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    if resume_in.title is not None:
        resume.title = resume_in.title
    if resume_in.template_id is not None:
        resume.template_id = resume_in.template_id
    if resume_in.data is not None:
        resume.data = resume_in.data.model_dump()
        
    await db.commit()
    return {"status": "ok", "id": str(resume.id)}
