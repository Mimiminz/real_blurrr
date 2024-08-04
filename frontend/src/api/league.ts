import axios from "axios";
import api from "./index";
import {
  LeagueList,
  LeagueBoardItem,
  BoardDetail,
  UserLeague,
} from "@/types/leagueTypes";

// 사용자 참여 리그 가져오는 함수
export const fetchUserLeagueList = async (): Promise<UserLeague[]> => {
  try {
    const response = await api.get(`/v1/leagues/members`);
    console.log(response.data);
    if (!response.data.data) {
      return [];
    }
    return response.data.data.leagueMembers;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      if (error.response?.status == 401) {
        return [];
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
};

// 브랜드 리그 목록을 가져오는 함수
export const fetchBrandLeagues = async (): Promise<LeagueList[]> => {
  try {
    const response = await api.get(`/v1/leagues`, {
      params: { leagueType: "BRAND" },
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
  criteria: string,
  leagueType: string
): Promise<LeagueBoardItem[]> => {
  try {
    console.log(leagueType);
    const response = await api.get(`/v1/leagues/${leagueId}/boards`, {
      params: { leagueType, criteria },
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
export const fetchMentionBoardList = async(leagueId: string, criteria: string): Promise<LeagueBoardItem[]> => {
  try {
    const response = await api.get(`/v1/leagues/${leagueId}/mentions`, {
      params: { criteria },
    });
    if (response.status === 204) {
      return [];
    }
    console.log(response.data.data)
    return response.data.data.channelBoards;
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
    const response = await api.get(`/v1/leagues/boards/${boardId}`);
    return response.data.data.boardDetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 리그 게시글 검색 함수
export const fetchBoardSearch = async (leagueId: string, keyword: string) => {
  try {
    const response = await api.get(`/v1/leagues/${leagueId}/boards/search`, {
      params: { keyword },
    });

    console.log(response.data.data);
    return response.data.data.boards;
  } catch (error) {
    throw error;
  }
};

// 리그 게시글 작성
export const fetchBoardWrite = async (
  leagueId: string,
  title: string,
  content: string
) => {
  try {
    const response = await api.post(`/v1/leagues/${leagueId}/boards`, {
      title: title,
      content: content,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 리그 게시글 삭제
export const fetchBoardDelete = async (boardId: string) => {
  try {
    const response = await api.delete(`/v1/boards/${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
