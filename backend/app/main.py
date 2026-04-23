from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth  # Import your auth module

app = FastAPI(title="Agentic OMS API")

# 🌐 CORS Configuration: Critical for React (5174) to talk to FastAPI (8000)
origins = [
    "http://localhost:5174",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🚦 Include Routers
# This keeps your main file clean as you add 20+ more features
app.include_router(auth.router, prefix="/api/v1", tags=["Authentication"])

@app.get("/")
def read_root():
    return {"status": "Agentic OMS Backend is live"}
