import { LeagueList } from "@/types/leagueTypes";
import api from "./index";
import {
  DashCamItem,
  HotBoardItem,
  TodayCarItem,
  MyCarItem,
} from "@/types/mainPageTypes";

export const fetchHotArticles = async (): Promise<HotBoardItem[]> => {
  try {
    const response = await api.get(`/v1/hot`);
    if (response.status === 204) {
      return [];
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchTodayCar = async (): Promise<TodayCarItem> => {
  try {
    const response = await api.get(`/v1/today/mycar`);
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchMyCars = async (): Promise<MyCarItem[]> => {
  try {
    const response = await api.get(`/v1/mycar`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchDashCams = async (): Promise<DashCamItem[]> => {
  try {
    const response = await api.get(`/v1/dashcam`);
    return response.data.data;
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
