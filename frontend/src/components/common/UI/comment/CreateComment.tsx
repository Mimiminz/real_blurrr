import { fetchCommentCreate, fetchReplyCreate } from "@/api/comment";
import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface CreateCommentProps {
  boardId: string;
  isReply: boolean;
  commentId: string;
  onCommentAdded: () => void;
}

export default function CreateComment({
  boardId,
  isReply,
  commentId,
  onCommentAdded,
}: CreateCommentProps) {
  const [comment, setComment] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 동작을 막음
    if (!comment.trim()) return; // 빈 댓글은 제출하지 않음

    try {
      if (isReply) {
        await fetchReplyCreate(commentId, boardId, comment);
      } else {
        await fetchCommentCreate(boardId, comment);
      }
      setComment("");
      onCommentAdded(); // 댓글 작성 후 콜백 호출
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Avatar />
      <Input
        type="text"
        placeholder="댓글 달기..."
        value={comment}
        onChange={handleChange}
      />
      <Button type="submit">작성</Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  background-color: #fff;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const Input = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #666;
`;

const Button = styled.button`
  background-color: #fbc02d;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
`;
