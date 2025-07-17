from pydantic import BaseModel
from typing import List, Optional
# I/P - O/P schema

# Blog and User data simple Structure.   
class User(BaseModel):
    name: str
    email: str
    password: str
    
  
class Blog(BaseModel):
    title: str
    body: str


# Output Structure

# Show User and its Blogs  
class ShowUser(BaseModel):
    name : str
    email : str
    blogs : List[Blog]
    class Config:
        from_attributes = True

# Show Owner/Creator of Blogs
class ShowCreator(BaseModel):
    name : str
    email : str
    class Config:
        from_attributes = True

# Show Blogs with their creator
class ShowBlog(Blog):
    creator: ShowCreator
    class Config:
        from_attributes = True
        
class Login(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None