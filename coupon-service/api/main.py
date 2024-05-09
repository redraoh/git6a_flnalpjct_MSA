import uvicorn
from api.routes import coupon
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from prometheus_fastapi_instrumentator import Instrumentator

import database as sess

app = FastAPI()
instrumentator = Instrumentator()
instrumentator.instrument(app).expose(app)

templates = Jinja2Templates(directory='/views/templates')

# CORS 설정
origins = [
    "http://54.180.127.84/:3000",  # 허용할 프론트엔드 도메인
    "http://54.180.127.84/:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    # allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(coupon.router)

if __name__ == '__main__':
    sess.create_tables()
    uvicorn.run('main:app', port=8040, reload=True)
