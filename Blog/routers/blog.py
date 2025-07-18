from fastapi import APIRouter, Depends, status
from .. import schemas, database, models, oaut2
from typing import List
from sqlalchemy.orm import Session
from ..repository import blog

router = APIRouter(
    prefix="/Blog",
    tags = ['Blogs'])

get_db = database.get_db

# Show Blogs
# All blogs
@router.get('/get_All_Blog', status_code=200, response_model=List[schemas.ShowBlog])
def all(db: Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_user)):
    return blog.get_all(db)


# Blog search by ID
@router.get('/get_Blog_by_Id/{id}', status_code=200, response_model=schemas.ShowBlog)
def show(id, db:Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_user)):
    return blog.get_by_id(id, db)
    

# Create Blog
@router.post('/create_Blog', status_code = status.HTTP_201_CREATED)
def create(request: schemas.Blog, db : Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_user)):
    return blog.create_blog(request, db, current_user)


# Update Blog
@router.put('/update_Blog/{id}', status_code = status.HTTP_202_ACCEPTED)
def update(id, request: schemas.Blog, db:Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_user)):
    return blog.update_blog(id, request, db)


# Delete Blog
@router.delete('/delete_Blog/{id}', status_code = status.HTTP_204_NO_CONTENT)
def destroy(id, db:Session = Depends(get_db), current_user: schemas.User = Depends(oaut2.get_current_user)):
    return blog.delete_blog(id, db)