import api from "./index";
import { fetchComment } from "@/types/commentTypes";

// 리그 댓글 목록 조회
export const fetchLeagueCommentList = async (
  leagueId: string,
  boardId: string
): Promise<fetchComment> => {
  try {
    const response = await api.get(
      `/v1/leagues/${leagueId}/boards/${boardId}/comments`
    );
    if (response.status === 204) {
      return { comments: [], commentCount: 0 };
    }
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 채널 댓글 목록 조회
export const fetchCommentList = async (
  boardId: string
): Promise<fetchComment> => {
  try {
    const response = await api.get(`/v1/boards/${boardId}/comments`);
    if (response.status === 204) {
      return { comments: [], commentCount: 0 };
    }
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 리그 댓글 작성
export const fetchLeagueCommentCreate = async (
  leagueId: string,
  boardId: string,
  content: string
) => {
  try {
    const response = await api.post(
      `/v1/leagues/${leagueId}/boards/${boardId}/comments`,
      {
        content: content,
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 채널 댓글 작성
export const fetchCommentCreate = async (boardId: string, content: string) => {
  try {
    const response = await api.post("/v1/comments", {
      boardId: boardId,
      content: content,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 리그 댓글 삭제
export const fetchLeagueCommentDelete = async (
  boardId: string,
  commentId: string,
  leagueId: string
) => {
  try {
    const response = await api.delete(
      `/v1/leagues/${leagueId}/comments/${commentId}/boards/${boardId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 채널 댓글 삭제
export const fetchCommentDelete = async (
  boardId: string,
  commentId: string
) => {
  try {
    const response = await api.put(
      `/v1/comments/${commentId}/boards/${boardId}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// 리그 대댓글 작성
export const fetchLeagueReplyCreate = async (
  commentId: string,
  boardId: string,
  content: string,
  leagueId: string
) => {
  try {
    const response = await api.post(
      `/v1/leagues/${leagueId}/boards/${boardId}/comments/${commentId}`,
      {
        content: content,
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// 채널 대댓글 작성
export const fetchReplyCreate = async (
  commentId: string,
  boardId: string,
  content: string
) => {
  try {
    const response = await api.post(`/v1/comments/${commentId}`, {
      boardId: boardId,
      content: content,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
