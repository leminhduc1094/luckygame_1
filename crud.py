from sqlalchemy.orm import Session
from starlette.exceptions import HTTPException
from starlette.responses import JSONResponse
from datetime import date


import models
import schemas


def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreateRequest):
    db_user = models.User(email=user.email, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def login(db: Session, user: schemas.UserCreateRequest):
    user_db : models.User = db.query(models.User).filter(models.User.email == user.email).first()
    if not user_db:
       return JSONResponse(
            status_code=400,
            content="email không tồn tại"
        )
    if user.password == user_db.password:
        return user_db.id
    else:
        return JSONResponse(
            status_code=400,
            content="password không đúng"
        )



def user_score_update(db: Session, user_id: int, user_score: schemas.UserScoreRequest):
    db_user : models.User = db.query(models.User).filter(models.User.id == user_id).first()  #lấy ra user từ trong db
    if not db_user:
        return JSONResponse(
            status_code=400,
            content="user không tồn tại"
        )
    if db_user.played_at and db_user.played_at.date() >= date.today():
        return JSONResponse(
            status_code=400,
            content="đã hết lượt quay hôm nay"
        )
    db_user.score = db_user.score + user_score.score  #thay đổi score trong db
    db_user.played_at = date.today()
    db.add(db_user)  #thêm dữ liệu vào db
    db.commit()
    db.refresh(db_user)
    return db_user.score

