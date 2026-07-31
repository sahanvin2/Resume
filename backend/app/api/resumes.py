import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from app.database import get_db
from app.models import Resume, User, Template
from app.schemas.resume import ResumeData

router = APIRouter()

class ResumeCreate(BaseModel):
    title: str = "Untitled Resume"
    template_id: str
    data: ResumeData

class ResumeUpdate(BaseModel):
    title: str | None = None
    template_id: str | None = None
    data: ResumeData | None = None

# Dummy user ID for Phase 2 before Auth is implemented
DUMMY_USER_ID = uuid.UUID("00000000-0000-0000-0000-000000000000")

async def ensure_dummy_data(db: AsyncSession):
    # Create a dummy user and template if they don't exist
    user = await db.execute(select(User).filter(User.id == DUMMY_USER_ID))
    if not user.scalar_one_or_none():
        db.add(User(id=DUMMY_USER_ID, email="dummy@example.com", hashed_password="pw", name="Dummy User"))
    
    template = await db.execute(select(Template).filter(Template.id == "modern-1"))
    if not template.scalar_one_or_none():
        db.add(Template(id="modern-1", name="Modern One", slug="modern-one", category="Modern", component_key="modern-1"))
    
    await db.commit()


@router.post("/", response_model=dict)
async def create_resume(resume_in: ResumeCreate, db: AsyncSession = Depends(get_db)):
    await ensure_dummy_data(db)
    
    new_resume = Resume(
        user_id=DUMMY_USER_ID,
        title=resume_in.title,
        template_id=resume_in.template_id,
        data=resume_in.data.model_dump()
    )
    db.add(new_resume)
    await db.commit()
    await db.refresh(new_resume)
    return {"id": str(new_resume.id)}

@router.get("/{resume_id}", response_model=dict)
async def get_resume(resume_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Resume).filter(Resume.id == resume_id))
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
async def update_resume(resume_id: uuid.UUID, resume_in: ResumeUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Resume).filter(Resume.id == resume_id))
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
