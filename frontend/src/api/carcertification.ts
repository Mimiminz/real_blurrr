import api from '../api/index'
import axios from 'axios';

export interface ImageURL {
    url: string;
}

export const submitImageForOCR = async (imageSrc: string): Promise<any> => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/ocr/", { url: imageSrc });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error submitting image:", error.message);
        console.error("Response data:", error.response?.data);
        console.error("Response status:", error.response?.status);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
};
