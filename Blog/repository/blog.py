from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from .. import models, schemas


def get_all(db:Session):
    blogs = db.query(models.Blog).all()
    return blogs


def get_by_id(id: int,db:Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id).first()
    if not blog:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f'Blog with the id {id} is not available!')
    return blog


def create_blog(request: schemas.Blog, db:Session, current_user: schemas.User):
    user_email = db.query(models.User).filter(models.User.email == current_user.email).first()
    user_id = user_email.id
    
    new_blog = models.Blog(title=request.title, body=request.body, user_id=user_id)
    
    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)
    return new_blog  


def update_blog(id: int, request: schemas.Blog, db:Session):
    blog = db.query(models.Blog).filter(models.Blog.id == id)
    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f'Blog with the id {id} is not available!')
    blog.update(request.dict())
    db.commit()
    return f"Blog with the id {id} has been updated."


def delete_blog(id: int, db:Session):
    blog = db.query(models.Blog).filter(models.Blog.id==id)
    if not blog.first():
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f'Blog with the id {id} is not available!')
    blog.delete(synchronize_session=False)
    db.commit()
    return f'Blog with the id {id} is deleted.'  
     