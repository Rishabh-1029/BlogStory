from .. import models, hashing, schemas
from sqlalchemy.orm import Session
from fastapi import HTTPException, status

def create_user(request: schemas.User,db:Session): 
    new_user = models.User(name=request.name,
                            email=request.email,
                            password=hashing.Hash(request.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def show_user(db:Session):  
    users = db.query(models.User).all()
    return users

def show_user_by_email(email:str, db:Session): 
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f'User with the Email {email} does not exist.')  
    return user 