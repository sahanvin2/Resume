import boto3
from datetime import datetime, timezone

# Credentials from user
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

def cleanup():
    print(f"Listing objects in {BUCKET}...")
    paginator = s3.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket=BUCKET)
    
    july_start = datetime(2026, 7, 1, tzinfo=timezone.utc)
    
    deleted = 0
    kept = 0
    
    for page in pages:
        if 'Contents' not in page:
            continue
        for obj in page['Contents']:
            key = obj['Key']
            last_modified = obj['LastModified']
            
            # Keep wallpapers
            if 'wallpaper' in key.lower():
                print(f"Keeping wallpaper: {key}")
                kept += 1
                continue
                
            # If after July, delete
            if last_modified >= july_start:
                print(f"Deleting object uploaded after July: {key}")
                s3.delete_object(Bucket=BUCKET, Key=key)
                deleted += 1
            else:
                print(f"Keeping old object: {key}")
                kept += 1

    print(f"Done. Deleted {deleted}, Kept {kept}.")

if __name__ == "__main__":
    cleanup()
