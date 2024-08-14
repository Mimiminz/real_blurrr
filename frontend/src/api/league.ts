import axios from "axios";
import api from "./index";
import {
  LeagueList,
  LeagueBoardItem,
  BoardDetail,
  UserLeague,
  MentionChannelList,
  LeagueBoardList,
} from "@/types/leagueTypes";

// 사용자 참여 리그 가져오는 함수
export const fetchUserLeagueList = async (): Promise<UserLeague[]> => {
  try {
    const response = await api.get(`/v1/leagues/members`);
    if (!response.data.data) {
      return [];
    }
    const leagues = response.data.data.leagueMembers;

    return leagues.sort((a: UserLeague, b: UserLeague) =>
      a.league.type === "MODEL" ? -1 : 1
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
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
  leagueType: string,
  pageNumber: number
): Promise<LeagueBoardList> => {
  try {
    const response = await api.get(`/v1/leagues/${leagueId}/boards`, {
      params: { leagueType, criteria, pageNumber },
    });
    if (response.status === 204) {
      return {
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0,
        content: [],
      };
    }
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch league board list", error);
    throw error;
  }
};

// 채널에서 멘션된 글을 가져오는 함수
export const fetchMentionBoardList = async (
  leagueId: string,
  criteria: string,
  pageNumber: number
): Promise<MentionChannelList> => {
  try {
    const response = await api.get(`/v1/leagues/${leagueId}/mentions`, {
      params: { criteria, pageNumber },
    });
    if (response.status === 204) {
      return {
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0,
        content: [],
      };
    }

    return response.data.data;
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

    return response.data.data;
  } catch (error) {
    throw error;
  }
};
// import { CancelTokenSource } from "axios";

// let cancelTokenSource: CancelTokenSource | null = null;

// export const fetchLeagueDetail = async (
//   boardId: string
// ): Promise<BoardDetail> => {
//
//   if (cancelTokenSource) {
//     cancelTokenSource.cancel("이전 요청이 취소되었습니다.");
//   }

//   cancelTokenSource = axios.CancelToken.source();

//   try {
//
//     const response = await api.get(`/v1/leagues/boards/${boardId}`, {
//       cancelToken: cancelTokenSource.token,
//     });
//
//     return response.data.data;
//   } catch (error) {
//     if (axios.isCancel(error)) {
//
//     } else {
//
//       throw error;
//     }
//   } finally {
//     cancelTokenSource = null; // 요청 완료 후 토큰 리셋
//   }
// };

// 리그 게시글 검색 함수
export const fetchBoardSearch = async (
  leagueId: string,
  keyword: string,
  leagueType: string,
  pageNumber: number
): Promise<LeagueBoardList> => {
  try {
    const response = await api.get(`/v1/leagues/${leagueId}/boards/search`, {
      params: { keyword, pageNumber, leagueType },
    });
    if (response.status === 204) {
      return {
        totalPages: 0,
        totalElements: 0,
        pageNumber: 0,
        pageSize: 0,
        content: [],
      };
    }
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 리그 게시글 작성
export const fetchBoardWrite = async (
  leagueId: string,
  leagueType: string,
  title: string,
  content: string
) => {
  try {
    const response = await api.post(
      `/v1/leagues/${leagueId}/boards`,
      { title, content }, // 요청 본문
      {
        params: { leagueType }, // 쿼리 매개변수
      }
    );

    return response.data.data;
  } catch (error) {
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
