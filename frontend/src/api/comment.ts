import api from "./index";

// 댓글 작성
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

// 댓글 삭제
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

// 대댓글 작성
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
