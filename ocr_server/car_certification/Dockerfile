# Python 베이스 이미지 사용
FROM python:3.9-slim

# 작업 디렉토리 설정
WORKDIR /app

# 필수 패키지 설치
RUN apt-get update && \
    apt-get install -y \
    pkg-config \
    libmysqlclient-dev \
    && rm -rf /var/lib/apt/lists/*

# 필요 라이브러리 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 코드 복사
COPY . .

#Uvicorn을 사용해 애플리케이션 실행
CMD ["uvicorn", "app.main:app", "—host", "0.0.0.0", "—port", "8000"]