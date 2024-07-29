import axios from "axios";
import { League, LeagueBoardItem } from "@/types/league";
const API_BASE_URL = "http://i11a307.p.ssafy.io:8080";

// 리그 목록을 가져오는 함수
export const fetchBrandLeagues = async (): Promise<League[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/v1/leagues`, {
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
  leagueId: string
): Promise<LeagueBoardItem[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/v1/leagues/${leagueId}/boards`
    );
    console.log(response);
    return response.data.data.boards;
  } catch (error) {
    console.error("Failed to fetch league board list", error);
    throw error;
  }
};
