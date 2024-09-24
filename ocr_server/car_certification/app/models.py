from sqlalchemy import Column, Integer, String
from .database import Base

class Car(Base):
    __tablename__ = 'cars'

    idx = Column(Integer, primary_key=True, index=True)
    brand = Column(String, index=True)
    series = Column(String)
    model_detail = Column(String)
    compare = Column(String)
