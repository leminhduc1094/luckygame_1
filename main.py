import uvicorn
from typing import List
from fastapi import Depends, FastAPI, HTTPException, Request
from sqlalchemy.orm import Session
from starlette.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates



import crud
import models
import schemas
from database import SessionLocal, engine

# SQLlite tự động tạo bảng DB
models.Base.metadata.create_all(bind=engine)


app = FastAPI()


app.mount("/static", StaticFiles(directory="view/static"), name="static")
templates = Jinja2Templates(directory="view/template")
@app.get("/", response_class=HTMLResponse)
async def home_page(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/login", response_class=HTMLResponse)
async def login_page(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})


# Dependency
# Tạo session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users")
def create_user(user: schemas.UserCreateRequest, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)


@app.post("/login")
def login(
    user: schemas.UserCreateRequest, db: Session = Depends(get_db)):
    return crud.login(db, user)


@app.get("/users/{user_id}", response_model=schemas.UserDetailResponse)
def user_detail(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.get("/users/get-by-email", response_model=schemas.UserDetailResponse)    #response_model để trả về model theo schemas
def user_detail(db: Session = Depends(get_db), user_email: str = ""):
    db_user = crud.get_user_by_email(db, email=user_email)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.put("/users/{user_id}/score")
def update_user_score(
    user_id: int, score: schemas.UserScoreRequest, db: Session = Depends(get_db)
):
    return crud.user_score_update(db=db, user_id=user_id, user_score=score)  #màu đỏ là tên khai báo bên function, màu trắng là dữ liệu hiện tại


if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8000)