from fastapi import FastAPI, Depends, HTTPException, APIRouter
from sqlalchemy.orm import Session




from api.database import get_db

from api.services import auth
from api.schemas import member as pym
from api.models import member as sqlm


router = APIRouter()

@router.get("/")
async def index():
    return {"message": "not here"}

# @app.get("/users", response_model=list[pym.User])
# async def list_users(db:Session = Depends(get_db)):
#     users = db.query(sqlm.User).all()
#     return [pym.User.from_orm(p) for p in users]

# 회원가입 하기
@router.post("/users", response_model=pym.User)
async def create_user(user: pym.UserCreate, db:Session = Depends(get_db)):
    return auth.register(db, user)

# 로그인 하기
@router.post("/login", response_model=pym.Token)
async def login_user(user: pym.UserLogin, db:Session = Depends(get_db)):
    token = auth.authenticate(db, user)

    if not token:
        raise HTTPException(status_code=401, detail='로그인 실패!! - 아이디 혹은 비밀번호를 확인하세요')

    return token
