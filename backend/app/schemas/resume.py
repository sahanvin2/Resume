from pydantic import BaseModel, HttpUrl, EmailStr, Field
from typing import List, Optional

class PersonalInfo(BaseModel):
    fullName: str = ""
    jobTitle: str = ""
    email: str = ""
    phone: str = ""
    location: str = ""
    website: str = ""
    linkedin: str = ""
    summary: str = ""

class Experience(BaseModel):
    company: str = ""
    role: str = ""
    location: str = ""
    startDate: str = ""
    endDate: str = ""
    current: bool = False
    bullets: List[str] = Field(default_factory=list)

class Education(BaseModel):
    school: str = ""
    degree: str = ""
    fieldOfStudy: str = ""
    startDate: str = ""
    endDate: str = ""
    gpa: str = ""

class Skill(BaseModel):
    name: str = ""
    level: Optional[str] = None

class Project(BaseModel):
    name: str = ""
    description: str = ""
    link: str = ""
    bullets: List[str] = Field(default_factory=list)

class Certification(BaseModel):
    name: str = ""
    issuer: str = ""
    date: str = ""

class Language(BaseModel):
    name: str = ""
    proficiency: str = ""

class CustomSectionItem(BaseModel):
    title: str = ""
    subtitle: str = ""
    date: str = ""
    description: str = ""

class CustomSection(BaseModel):
    title: str = ""
    items: List[CustomSectionItem] = Field(default_factory=list)

class ResumeData(BaseModel):
    personalInfo: PersonalInfo = Field(default_factory=PersonalInfo)
    experience: List[Experience] = Field(default_factory=list)
    education: List[Education] = Field(default_factory=list)
    skills: List[Skill] = Field(default_factory=list)
    projects: List[Project] = Field(default_factory=list)
    certifications: List[Certification] = Field(default_factory=list)
    languages: List[Language] = Field(default_factory=list)
    customSections: List[CustomSection] = Field(default_factory=list)
    sectionOrder: List[str] = Field(
        default_factory=lambda: [
            "personalInfo",
            "experience",
            "education",
            "skills",
            "projects",
            "certifications",
            "languages",
            "customSections"
        ]
    )
