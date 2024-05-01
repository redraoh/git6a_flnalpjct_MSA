from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

import api.models.coupon as sqlm
import api.schema.coupon as pym
from api.database import get_db

router = APIRouter()


@router.get("/")
async def index():
    return {"message": "Hello World"}


# 전체조회
@router.get("/coupons", response_model=list[pym.Coupon])
async def list_coupons(db: Session = Depends(get_db)):
    coupons = db.query(sqlm.Coupon).all()
    return [pym.Coupon.from_orm(p) for p in coupons]


# 조회
@router.get("/coupons/{cpg}", response_model=list[pym.Coupon])
async def list_coupons(cpg: int, db: Session = Depends(get_db)):
    stnum = (cpg - 1) * 10
    coupons = db.query(sqlm.Coupon).offset(stnum).limit(10)
    return [pym.Coupon.from_orm(p) for p in coupons]


# 입력
@router.post("/coupons", response_model=pym.Coupon)
async def create_coupons(coupon: pym.CouponCreate, db: Session = Depends(get_db)):
    coupon = sqlm.Coupon(**coupon.model_dump())
    coupon.disc_time = datetime.now().isoformat(' ', 'seconds')
    db.add(coupon)
    db.commit()
    db.refresh(coupon)
    return pym.Coupon.from_orm(coupon)


# 전체 검색 조회
@router.get("/cpfind/{skey}", response_model=list[pym.Coupon])
async def find_coupons(skey: str, db: Session = Depends(get_db)):
    coupons = db.query(sqlm.Coupon).filter(func.lower(sqlm.Coupon.disc_time).like('%' + skey + '%'))
    return [pym.Coupon.from_orm(p) for p in coupons]


# 검색 조회
@router.get("/cpfind/{skey}/{cpg}", response_model=list[pym.Coupon])
async def find_coupons(skey: str, cpg: int, db: Session = Depends(get_db)):
    stnum = (cpg - 1) * 10
    coupons = db.query(sqlm.Coupon).filter(func.lower(sqlm.Coupon.disc_time).like('%' + skey + '%')).offset(
        stnum).limit(10)
    return [pym.Coupon.from_orm(p) for p in coupons]


# 전체 그룹 조회
@router.get("/sumfind", response_model=list[pym.Coupon])
async def find_coupons(db: Session = Depends(get_db)):
    coupons = db.query(sqlm.Coupon, func.count(sqlm.Coupon.dno).label('count')).order_by(sqlm.Coupon.dno).group_by(sqlm.Coupon.disc)
    print('쿠폰!')
    print(coupons)
    return [pym.Coupon.from_orm(p) for p in coupons]


# 특정 그룹 검색 조회
@router.get("/sumfindall/{skey}", response_model=list[pym.Coupon])
async def find_coupons(skey: str, db: Session = Depends(get_db)):
    coupons = db.query(sqlm.Coupon).filter(func.lower(sqlm.Coupon.disc_time).like('%' + skey + '%'))
    return [pym.Coupon.from_orm(p) for p in coupons]


# 특정 그룹 검색 페이지 조회
@router.get("/sumfindall/{skey}/{cpg}", response_model=list[pym.Coupon])
async def find_coupons(skey: str, cpg: int, db: Session = Depends(get_db)):
    stnum = (cpg - 1) * 10
    coupons = db.query(sqlm.Coupon).filter(func.lower(sqlm.Coupon.disc_time).like('%' + skey + '%')).offset(
        stnum).limit(10)
    return [pym.Coupon.from_orm(p) for p in coupons]
