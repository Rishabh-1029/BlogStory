from fastapi import FastAPI

app = FastAPI(title="BitFumes FastAPI")

@app.get('/')
def readroot():
    return 'Hello world!'

@app.get('/about')
def aboutSection():
    return {'data' : 'About us'}