import api from "./index";
import { HotBoardItem, TodayCarItem } from "@/types/mainPageTypes";

export const fetchHotArticles = async (): Promise<HotBoardItem[]> => {
  try {
    const response = await api.get(`/v1/boards/hot`);
    if (!response.data.data) {
      return [];
    }
    return response.data.data.boards;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTodayCar = async (): Promise<TodayCarItem> => {
  try {
    const response = await api.get(`/v1/boards/today/mycar`);
    return response.data.data.myCar;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMyCars = async (): Promise<TodayCarItem[]> => {
  try {
    const response = await api.get(`/v1/boards/mycar`);
    return response.data.data.boards;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchDashCams = async (): Promise<TodayCarItem[]> => {
  try {
    const response = await api.get(`/v1/boards/dashcam`);
    return response.data.data.boards;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
