from fastapi import APIRouter, Depends
from .. import schemas, database
from typing import List
from sqlalchemy.orm import Session
from ..repository import user


router = APIRouter(
    prefix="/User",
    tags=['User Login/Registration']
    )

get_db = database.get_db

# Create User
@router.post('/create_user',status_code=200, response_model=schemas.ShowCreator)
def create_user(request: schemas.User, db:Session = Depends(get_db)):
    return user.create_user(request,db)

# Show all user
@router.get('/show_user',status_code=200, response_model=List[schemas.ShowUser])
def show_user(db: Session = Depends(get_db)):
    return user.show_user(db)

# Show user by email
@router.get('/get_user_by_email/{email}', status_code=200, response_model=schemas.ShowUser)
def show(email, db:Session = Depends(get_db)):
    return user.show_user_by_email(email, db)
