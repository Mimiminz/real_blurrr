import api from "./index";
import { LeagueList, LeagueBoardItem, BoardDetail } from "@/types/league";

// 리그 목록을 가져오는 함수
export const fetchBrandLeagues = async (): Promise<LeagueList[]> => {
  try {
    const response = await api.get(`/v1/leagues`, {
      params: { type: "BRAND" },
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Inp6ekBhYS5jb20iLCJyb2xlIjoiUk9MRV9CQVNJQ19VU0VSIiwiaWF0IjoxNzIyMzEwMzM3LCJleHAiOjE3MjIzMTIxMzd9.EdRktZ-zwg5f1nO7UXsNJTDHvWb8LRmVT-wznAqpy2s",
      },
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
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Inp6ekBhYS5jb20iLCJyb2xlIjoiUk9MRV9CQVNJQ19VU0VSIiwiaWF0IjoxNzIyMzEwMzM3LCJleHAiOjE3MjIzMTIxMzd9.EdRktZ-zwg5f1nO7UXsNJTDHvWb8LRmVT-wznAqpy2s",
      },
    });
    console.log(response);
    return response.data.data.boards;
  } catch (error) {
    console.error("Failed to fetch league board list", error);
    throw error;
  }
};

// 리그 게시글 상세 정보를 가져오는 함수
export const fetchLeagueDetail = async (
  boardId: string
): Promise<BoardDetail> => {
  try {
    const response = await api.get(`/v1/leagues/boards/${boardId}`, {
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Inp6ekBhYS5jb20iLCJyb2xlIjoiUk9MRV9CQVNJQ19VU0VSIiwiaWF0IjoxNzIyMzEwMzM3LCJleHAiOjE3MjIzMTIxMzd9.EdRktZ-zwg5f1nO7UXsNJTDHvWb8LRmVT-wznAqpy2s",
      },
    });
    console.log(response.data);
    return response.data.data.boardDetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
