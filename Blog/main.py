# Libraries and Modules
from fastapi import FastAPI
from . import models
from .database import engine
from .routers import blog, user

app = FastAPI(title = 'BlogStory')


# Home Page
@app.get('/',tags=['Home'])
def readroots():
    return {"Welcome":"BitFume's BlogStory by Rishabh using FastAPI."}

# Database
models.Base.metadata.create_all(engine)

# User data route
app.include_router(user.router)

# Blogs data route
app.include_router(blog.router)