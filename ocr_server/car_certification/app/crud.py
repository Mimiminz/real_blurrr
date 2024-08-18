from sqlalchemy.orm import Session
from .models import Car
from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging

def get_most_similar_car(db: Session, vehicle_model: str) -> dict:
    # 모든 차량 데이터 가져오기
    cars = db.query(Car).all()
    car_details = [car.compare for car in cars]
    
    if not car_details:
        logging.warning("No car details found in the database.")
        return {"message": "차량 데이터가 없습니다."}

    # 'None' 값 제거하고 유사도 계산
    car_details = [detail if detail is not None else '' for detail in car_details]
    vehicle_model = vehicle_model if vehicle_model is not None else ''
    
    vectorizer = TfidfVectorizer(ngram_range=(1, 2))  # 1-gram과 2-gram 사용
    vectors = vectorizer.fit_transform([vehicle_model] + car_details)
    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:])

    most_similar_index = cosine_sim.argmax()
    most_similar_car = cars[most_similar_index]

    if cosine_sim[0][most_similar_index] == 0:
        logging.info(f"No similar car model found for: {vehicle_model}")
        return {"message": "유사한 차량 모델을 찾을 수 없습니다."}

    logging.info(f"Most similar car: {most_similar_car.model_detail} (Similarity: {cosine_sim[0][most_similar_index]})")
    
    return {
        "brand": most_similar_car.brand,
        "series": most_similar_car.series,
        "model_detail": most_similar_car.model_detail,
        "compare": most_similar_car.compare
    }
