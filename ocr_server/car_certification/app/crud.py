from sqlalchemy.orm import Session
from .models import Car
from typing import List
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def get_most_similar_car(db: Session, vehicle_model: str) -> dict:
    cars = db.query(Car).all()
    car_details = [car.model_detail for car in cars]
    
    if not car_details:
        return {}

    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([vehicle_model] + car_details)
    cosine_sim = cosine_similarity(vectors[0:1], vectors[1:])
    
    most_similar_index = cosine_sim.argmax()
    most_similar_car = cars[most_similar_index]
    
    return {
        "brand": most_similar_car.brand,
        "series": most_similar_car.series,
        "model_detail": most_similar_car.model_detail
    }
