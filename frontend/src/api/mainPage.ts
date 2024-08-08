import { LeagueList } from "@/types/leagueTypes";
import api from "./index";
import { HotBoardItem, TodayCarItem } from "@/types/mainPageTypes";

export const fetchHotArticles = async (): Promise<HotBoardItem[]> => {
  try {
    const response = await api.get(`/v1/channels/hot`);
    if (!response.data.data) {
      return [];
    }
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchTodayCar = async (): Promise<TodayCarItem> => {
  try {
    const response = await api.get(`/v1/channels/today/mycar`);
    return response.data.data.myCar;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMyCars = async (): Promise<TodayCarItem[]> => {
  try {
    const response = await api.get(`/v1/channels/mycar`);
    return response.data.data.boards;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchDashCams = async (): Promise<TodayCarItem[]> => {
  try {
    const response = await api.get(`/v1/channels/dashcam`);
    return response.data.data.boards;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchLeagueRanking = async (): Promise<LeagueList[]> => {
  try {
    const response = await api.get(`/v1/leagues/ranking`);
    return response.data.data.leagues;
  } catch (error) {
    throw error;
  }
};
