# Libraries and Modules
from fastapi import FastAPI
from . import models
from .database import engine
from .routers import blog, user, authentication
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title = 'BlogStory')
origins = [
    "http://localhost:5173",  # React dev server
    "https://your-frontend-domain.com",  # Production URL if deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # Allow these origins
    allow_credentials=True,
    allow_methods=["*"],          # Allow GET, POST, etc.
    allow_headers=["*"],          # Allow headers like Authorization
)



# Home Page
@app.get('/',tags=['Home'])
def readroots():
    return {"Welcome":"BitFume's BlogStory by Rishabh using FastAPI."}

# Database
models.Base.metadata.create_all(engine)

# Authentication
app.include_router(authentication.router)

# User data route
app.include_router(user.router)

# Blogs data route
app.include_router(blog.router)
