from passlib.context import CryptContext

# Encryption
pwd_cxt = CryptContext(schemes=["bcrypt"], deprecated="auto")

def Hash(password):
    return pwd_cxt.hash(password)