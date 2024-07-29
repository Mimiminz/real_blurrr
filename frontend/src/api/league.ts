import api from "./index";
import { League, LeagueBoardItem } from "@/types/league";

// 리그 목록을 가져오는 함수
export const fetchBrandLeagues = async (): Promise<League[]> => {
  try {
    const response = await api.get(`/v1/leagues`, {
      params: { type: "BRAND" },
    });
    return response.data.data.leagues;
  } catch (error) {
    console.error("Failed to fetch league list", error);
    throw error;
  }
};

// 리그 보드 목록을 가져오는 함수
export const fetchLeagueBoardList = async (
  leagueId: string,
  criteria: string = "TIME"
): Promise<LeagueBoardItem[]> => {
  try {
    const response = await api.get(`/v1/leagues/${leagueId}/boards`, {
      params: { criteria },
    });
    console.log(response);
    return response.data.data.boards;
  } catch (error) {
    console.error("Failed to fetch league board list", error);
    throw error;
  }
};
