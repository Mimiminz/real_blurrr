import api from "./index";

// 리그 좋아요 생성
export const fetchLeagueLike = async (boardId: string) => {
  try {
    const response = await api.post(`/v1/leagues/likes/boards/${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 리그 좋아요 조회
export const fetchLeaugueLikeState = async (boardId: string) => {
  try {
    const response = await api.get(`v1/leagues/boards/${boardId}/likes`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// 리그 좋아요 삭제
export const fetchLeagueLikeDelete = async (boardId: string) => {
  try {
    const response = await api.delete(`/v1/leagues/likes/boards/${boardId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
