import sqlalchemy

from sqlalchemy.orm import sessionmaker

db_url = 'sqlite:///car.db'

engine = sqlalchemy.create_engine(db_url, echo=True)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)



# 서버시작시 테이블 생성
def db_startup():
    from api.models import discount
    discount.Base.metadata.create_all(engine)