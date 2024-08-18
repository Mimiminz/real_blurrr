from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
import requests
import uuid
import time
import json
from io import BytesIO
import base64
from PIL import Image
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session
from .database import SessionLocal, init_db
from .crud import get_most_similar_car
import re
import logging

# .env 파일의 환경 변수 로드
load_dotenv()

# 환경 변수 사용
api_url = os.getenv('OCR_API_URL')
secret_key = os.getenv('OCR_SECRET_KEY')

app = FastAPI()

# 데이터베이스 초기화
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 데이터베이스 세션 의존성
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# OCR 요청을 위한 함수
def ocr_recognition(image_file):
    request_json = {
        'images': [
            {
                'format': 'jpg',
                'name': 'demo'
            }
        ],
        'requestId': str(uuid.uuid4()),
        'version': 'V2',
        'timestamp': int(round(time.time() * 1000))
    }

    payload = {'message': json.dumps(request_json).encode('UTF-8')}
    files = [
        ('file', image_file)
    ]
    headers = {
        'X-OCR-SECRET': secret_key
    }

    try:
        response = requests.post(api_url, headers=headers, data=payload, files=files)
        response.raise_for_status() 
    except requests.RequestException as e:
        raise HTTPException(status_code=500, detail=f"OCR API 요청 실패: {e}")

    return response.json()

# 이미지 데이터 모델
class ImageData(BaseModel):
    image_data: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the OCR API!"}

@app.post("/ocr/")
async def process_registration(data: ImageData, db: Session = Depends(get_db)):
    try:
        logging.info("Processing OCR request...")

        # 이미지 데이터 처리
        image_data = data.image_data.split(",")[1]
        image = Image.open(BytesIO(base64.b64decode(image_data)))

        if image.mode == 'RGBA':
            image = image.convert('RGB')

        img_byte_arr = BytesIO()
        image.save(img_byte_arr, format='JPEG')
        img_byte_arr.seek(0)

        # OCR 처리
        ocr_result = ocr_recognition(img_byte_arr)
        
        extracted_texts = [field['inferText'] for field in ocr_result['images'][0]['fields']]

        # '차명' 텍스트를 찾고, 그 뒤의 텍스트 추출
        vehicle_model = extract_vehicle_model(extracted_texts)

        # 정규 표현식으로 괄호 등 불필요한 문자 제거
        vehicle_model = re.sub(r'\([^)]*\)', '', vehicle_model)

        if not vehicle_model or vehicle_model == "차명을 찾을 수 없습니다.":
            raise HTTPException(status_code=400, detail="차량명이 인식되지 않습니다. 다시 촬영해주세요.")

        # 가장 유사한 차량 모델 찾기
        similar_car = get_most_similar_car(db, vehicle_model)

        if not similar_car:
            raise HTTPException(status_code=404, detail="유사한 차량 모델을 찾을 수 없습니다. 관리자에게 문의해주세요.")

        # 전처리된 이미지 반환
        preprocessed_image = img_byte_arr.getvalue()
        preprocessed_image_base64 = base64.b64encode(preprocessed_image).decode('utf-8')

        logging.info(f"Vehicle Model: {vehicle_model}")
        logging.info(f"Similar Car: {similar_car}")

        return {
            "extracted_texts": extracted_texts,
            "vehicle_model": vehicle_model,
            "similar_car": similar_car,
            "preprocessed_image": f"data:image/jpeg;base64,{preprocessed_image_base64}"
        }
    except HTTPException as e:
        # 사용자에게 보여줄 메시지
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        # 모든 기타 예외 처리
        logging.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="서버에서 예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.")

# 텍스트에서 '차명' 키워드 추출하는 함수
def extract_vehicle_model(extracted_texts: List[str]) -> str:
    combined_text = ''.join(text.replace(' ', '') for text in extracted_texts)
    
    start_index = combined_text.find('차명')
    end_index = combined_text.find('5형식')

    if start_index != -1 and end_index != -1:
        vehicle_model_text = combined_text[start_index:end_index].strip()
        vehicle_model_text = vehicle_model_text.replace('차명', '').strip()
        return vehicle_model_text
    return "차명을 찾을 수 없습니다."
