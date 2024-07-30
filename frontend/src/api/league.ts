import api from "./index";
import { LeagueList, LeagueBoardItem, BoardDetail } from "@/types/league";

// 리그 목록을 가져오는 함수
export const fetchBrandLeagues = async (): Promise<LeagueList[]> => {
  try {
    const response = await api.get(`/v1/leagues/brands`);
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
    const response = await api.get(`/v1/leagues/brands/${leagueId}/boards`, {
      params: { criteria },
    });
    if (response.status === 204) {
      return [];
    }
    return response.data.data.boards;
  } catch (error) {
    console.error("Failed to fetch league board list", error);
    throw error;
  }
};

// 채널에서 멘션된 글을 가져오는 함수
// export const fetchMentionBoardList = async()

// 리그 게시글 상세 정보를 가져오는 함수
export const fetchLeagueDetail = async (
  boardId: string
): Promise<BoardDetail> => {
  try {
    const response = await api.get(`/v1/leagues/boards/${boardId}`);
    return response.data.data.boardDetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 리그 게시글 검색 함수
// export const fetchBoardSearch = async (leagueId: string) => {
//   try {
//     const response = await api.get(`/v1/leagues`)
//   }
// }
