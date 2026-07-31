import os
import uuid
import boto3
from app.worker import celery_app
from playwright.sync_api import sync_playwright

ENDPOINT_URL = "https://s3.us-east-005.backblazeb2.com"
ACCESS_KEY = "0053aaa597862ee0000000001"
SECRET_KEY = "K005kVHvMmLD696fVPINAqzU2wW+HGs"
BUCKET = "movia-prod"
REGION = "us-east-005"

s3 = boto3.client('s3',
    endpoint_url=ENDPOINT_URL,
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
    region_name=REGION
)

@celery_app.task(bind=True)
def generate_pdf(self, export_id: str, resume_id: str):
    # Determine the URL for the render endpoint
    # In production, this would be the live Next.js domain
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    render_url = f"{frontend_url}/render/{resume_id}"
    
    file_name = f"resumes/{resume_id}_{uuid.uuid4().hex[:8]}.pdf"
    local_pdf_path = f"/tmp/{file_name.replace('/', '_')}"

    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            # Navigate to the render page and wait for it to be fully loaded
            page.goto(render_url, wait_until="networkidle")
            
            # Export to PDF
            page.pdf(
                path=local_pdf_path,
                format="A4",
                print_background=True,
                margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
            )
            browser.close()

        # Upload to S3 (Backblaze B2)
        s3.upload_file(
            local_pdf_path,
            BUCKET,
            file_name,
            ExtraArgs={'ContentType': 'application/pdf'}
        )
        
        file_url = f"{ENDPOINT_URL}/{BUCKET}/{file_name}"
        
        # Clean up local file
        if os.path.exists(local_pdf_path):
            os.remove(local_pdf_path)

        # In a full implementation, we'd update the database 'exports' table status to 'completed' here
        # For simplicity in the task, we just return the URL
        return {"status": "completed", "file_url": file_url}

    except Exception as e:
        if os.path.exists(local_pdf_path):
            os.remove(local_pdf_path)
        # Update db export record to 'failed'
        return {"status": "failed", "error": str(e)}
