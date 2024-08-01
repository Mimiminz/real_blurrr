import api from "./index";
import { HotBoardItem } from "@/types/mainPageTypes";

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
