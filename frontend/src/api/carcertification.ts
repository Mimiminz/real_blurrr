import api from '../api/index'
import axios from 'axios';

export interface ImageURL {
    url: string;
}

export const submitImageForOCR = async (imageSrc: string): Promise<any> => {
  try {
    const response = await axios.post("https://i11a307.p.ssafy.io/ocr/", { image_data: imageSrc });
    // const response = await axios.post("http://localhost:8000/ocr/", { image_data: imageSrc });
    return response.data;
  } catch (error) {

    throw error;
  }
};


