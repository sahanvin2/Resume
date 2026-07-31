import uuid
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel
from app.database import get_db
from app.models import Export, Resume
from app.tasks.export import generate_pdf

router = APIRouter()

class ExportCreate(BaseModel):
    resume_id: str
    format: str = "pdf"

@router.post("/", response_model=dict)
async def trigger_export(export_in: ExportCreate, db: AsyncSession = Depends(get_db)):
    # Verify resume exists
    resume_id_uuid = uuid.UUID(export_in.resume_id)
    result = await db.execute(select(Resume).filter(Resume.id == resume_id_uuid))
    resume = result.scalar_one_or_none()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    new_export = Export(
        resume_id=resume.id,
        format=export_in.format,
        status="pending"
    )
    db.add(new_export)
    await db.commit()
    await db.refresh(new_export)
    
    # Trigger celery task
    generate_pdf.delay(str(new_export.id), str(resume.id))
    
    return {"export_id": str(new_export.id), "status": "pending"}

@router.get("/{export_id}", response_model=dict)
async def get_export_status(export_id: uuid.UUID, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Export).filter(Export.id == export_id))
    export_record = result.scalar_one_or_none()
    
    if not export_record:
        raise HTTPException(status_code=404, detail="Export not found")
        
    return {
        "export_id": str(export_record.id),
        "status": export_record.status,
        "file_url": export_record.file_url
    }
