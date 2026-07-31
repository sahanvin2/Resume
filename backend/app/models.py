import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    name = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    resumes = relationship("Resume", back_populates="user", cascade="all, delete-orphan")


class Template(Base):
    __tablename__ = "templates"

    id = Column(String, primary_key=True) # e.g. "modern-1"
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    category = Column(String, nullable=False)
    thumbnail_url = Column(String, nullable=True)
    is_premium = Column(Boolean, default=False)
    component_key = Column(String, nullable=False)
    ats_friendly = Column(Boolean, default=False)

    resumes = relationship("Resume", back_populates="template")


class Resume(Base):
    __tablename__ = "resumes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False, default="Untitled Resume")
    template_id = Column(String, ForeignKey("templates.id"), nullable=False)
    data = Column(JSONB, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="resumes")
    template = relationship("Template", back_populates="resumes")
    exports = relationship("Export", back_populates="resume", cascade="all, delete-orphan")


class Export(Base):
    __tablename__ = "exports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    resume_id = Column(UUID(as_uuid=True), ForeignKey("resumes.id"), nullable=False)
    format = Column(String, nullable=False) # 'pdf' or 'docx'
    file_url = Column(String, nullable=True)
    status = Column(String, default="pending") # 'pending', 'completed', 'failed'
    created_at = Column(DateTime, default=datetime.utcnow)

    resume = relationship("Resume", back_populates="exports")
