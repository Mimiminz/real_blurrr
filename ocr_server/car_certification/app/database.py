from sqlalchemy import create_engine, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pathlib import Path

DATABASE_URL = 'mysql+pymysql://root:blurr123@i11a307.p.ssafy.io:3306/blur'

# 데이터베이스 엔진 생성
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def init_db():
    sql_file_path = Path("app/cars.sql")
    if sql_file_path.exists():
        with engine.connect() as conn:
            with open(sql_file_path, "r", encoding="utf-8") as f:
                sql = f.read()
                #conn.execute(text(sql))
    else:
        print(f"SQL file {sql_file_path} does not exist.")

    # ORM 모델에 기반하여 테이블 생성 (필요한 경우)
    Base.metadata.create_all(bind=engine)