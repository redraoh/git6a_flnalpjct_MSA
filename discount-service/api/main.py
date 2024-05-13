import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import discount
from prometheus_fastapi_instrumentator import Instrumentator

app = FastAPI()
instrumentator = Instrumentator()
instrumentator.instrument(app).expose(app)

# CORS 설정
origins = [
    "http://3.36.108.3:32321",  # 허용할 프론트엔드 도메인
    "http://3.36.108.3:30742",
    "http://3.36.108.3:32323",
    "http://3.36.108.3:32322",
    "http://3.36.108.3:32324"

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    #allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(discount.car_router)


if __name__ == '__main__':
    uvicorn.run('main:app', host="0.0.0.0", port=8050, reload=True)
