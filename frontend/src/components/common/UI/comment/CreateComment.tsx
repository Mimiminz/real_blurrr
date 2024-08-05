import {
  fetchCommentCreate,
  fetchLeagueCommentCreate,
  fetchLeagueReplyCreate,
  fetchReplyCreate,
} from "@/api/comment";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

import { CreateCommentProps } from "@/types/commentTypes";
import { useAuthStore } from "@/store/authStore";

export default function CreateComment({
  boardId,
  leagueId,
  isLeague,
  isReply,
  commentId,
  onCommentAdded,
  inputRef,
}: CreateCommentProps & { inputRef?: React.RefObject<HTMLInputElement> }) {
  const { user } = useAuthStore();
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 폼의 기본 동작을 막음
    if (!comment.trim()) return; // 빈 댓글은 제출하지 않음

    if (comment.length > 200) {
      alert("댓글은 200자까지만 작성이 가능합니다.");
      return;
    }

    try {
      if (isReply) {
        if (isLeague) {
          await fetchLeagueReplyCreate(commentId, boardId, comment, leagueId);
        } else {
          await fetchReplyCreate(commentId, boardId, comment);
        }
      } else {
        if (isLeague) {
          await fetchLeagueCommentCreate(leagueId, boardId, comment);
        } else {
          await fetchCommentCreate(boardId, comment);
        }
      }
      setComment("");
      onCommentAdded(); // 댓글 작성 후 콜백 호출
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Avatar src={user?.profileUrl} alt={`${user?.nickname}'s avatar`} />
      <InputContainer>
        <Input
          type="text"
          placeholder="댓글 달기..."
          value={comment}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
        />
        {isFocused && <CharCount>{comment.length}/200</CharCount>}
      </InputContainer>
      <Button type="submit" disabled={!comment.trim()}>
        작성
      </Button>
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

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-top: 3px;
  margin-right: 8px;
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 40px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  color: #666;
`;

const CharCount = styled.div`
  align-self: flex-end;
  font-size: 12px;
  color: #999;
  margin-right: 8px;
`;

const Button = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#fbc02d")};
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
