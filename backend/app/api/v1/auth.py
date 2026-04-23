import os
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse
from google_auth_oauthlib.flow import Flow

# Load environment variables from .env file
load_dotenv()

router = APIRouter()


# Construct the client configuration from environment variables
client_config = {
    "web": {
        "client_id": os.getenv("GOOGLE_CLIENT_ID"),
        "project_id": os.getenv("GOOGLE_PROJECT_ID"),
        "auth_uri": os.getenv("AUTH_URI"),
        "token_uri": os.getenv("TOKEN_URI"),
        "auth_provider_x509_cert_url": os.getenv("AUTH_PROVIDER"),
        "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
        "redirect_uris": [os.getenv("REDIRECT_URI")]
    }
}

# Scopes required for Gmail Ingestion and AI agent communication
SCOPES = [
    'https://www.googleapis.com/auth/userinfo.email',   # To identify the user
    'https://www.googleapis.com/auth/gmail.readonly',      # For reading email
    'https://www.googleapis.com/auth/gmail.send'
]

@router.get("/auth/url")
def get_auth_url():
    """Generates the Google login URL using variables from .env"""
    if not client_config["web"]["client_id"] or not client_config["web"]["client_secret"]:
        raise HTTPException(
            status_code=500, 
            detail="Google credentials missing in .env file"
        )

    try:
        flow = Flow.from_client_config(
            client_config,
            scopes=SCOPES,
            redirect_uri='http://localhost:8000/api/v1/auth/callback'
        )
        
        # 'offline' access gives us the Refresh Token needed for background AI ingestion
        auth_url, _ = flow.authorization_url(prompt='consent', access_type='offline')
        return {"url": auth_url}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OAuth Flow Error: {str(e)}")

@router.get("/auth/callback")
async def auth_callback(code: str = Query(...)):
    """Handles the return from Google and exchanges the code for tokens"""
    try:
        flow = Flow.from_client_config(
            client_config,
            scopes=SCOPES,
            redirect_uri='http://localhost:8000/api/v1/auth/callback'
        )
        flow.fetch_token(code=code)
        credentials = flow.credentials

        # TODO: Save credentials.refresh_token to PostgreSQL here
        print(f"Tokens acquired for project: {client_config['web']['project_id']}")

        # Redirect back to the frontend with a success flag
        return RedirectResponse(url="http://localhost:5174/setup?connected=true")

    except Exception as e:
        return RedirectResponse(url=f"http://localhost:5174/setup?connected=false&error={str(e)}")
