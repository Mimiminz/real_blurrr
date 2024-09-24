from pydantic import BaseModel

class ImageData(BaseModel):
    image_data: str

class CarSchema(BaseModel):
    brand: str
    series: str
    model_detail: str
    compare: str

    class Config:
        orm_mode = True
