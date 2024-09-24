import { likeState } from "@/types/boardType";
import api from "./index";

// 리그 좋아요 생성
export const fetchLeagueLike = async (boardId: string): Promise<likeState> => {
  try {
    const response = await api.post(`/v1/leagues/likes/boards/${boardId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 채널 좋아요 생성
export const fetchChannelLike = async (boardId: string): Promise<likeState> => {
  try {
    const response = await api.post(`/v1/likes/boards/${boardId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 리그 좋아요 삭제
export const fetchLeagueLikeDelete = async (
  boardId: string
): Promise<likeState> => {
  try {
    const response = await api.delete(`/v1/leagues/likes/boards/${boardId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 채널 좋아요 삭제
export const fetchChannelLikeDelete = async (
  boardId: string
): Promise<likeState> => {
  try {
    const response = await api.delete(`/v1/likes/boards/${boardId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
