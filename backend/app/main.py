from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import resumes

app = FastAPI(title="Resume Builder API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resumes.router, prefix="/api/resumes", tags=["Resumes"])

@app.get("/")
def health_check():
    return {"status": "ok"}
