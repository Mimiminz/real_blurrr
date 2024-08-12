import {
  fetchCommentCreate,
  fetchLeagueCommentCreate,
  fetchLeagueReplyCreate,
  fetchReplyCreate,
} from "@/api/comment";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newComment = e.target.value;

    if (newComment.length <= 200) {
      setComment(newComment);
      e.target.style.height = "auto"; // 높이를 초기화하여 내용에 맞게 재조정

      if (
        newComment.includes("\n") ||
        e.target.scrollHeight > e.target.clientHeight
      ) {
        e.target.style.height = "auto"; // 높이를 초기화하여 내용에 맞게 재조정
        e.target.style.height = e.target.scrollHeight + "px"; // 줄바꿈 발생 시 높이 조정
      } else {
        e.target.style.height = "34px"; // 텍스트가 한 줄일 때는 높이를 기본값으로 유지
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault(); // 폼의 기본 동작을 막음
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
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "34px"; // 제출 후 높이를 34px로 리셋
      }
      onCommentAdded(); // 댓글 작성 후 콜백 호출
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Avatar src={user?.profileUrl} alt={`${user?.nickname}'s avatar`} />
      <InputContainer>
        <TextArea
          ref={textAreaRef}
          value={comment}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 입력하세요..."
        />
        <CharCount>{comment.length}/200</CharCount>
      </InputContainer>
      <Button type="submit" disabled={!comment.trim()}>
        작성
      </Button>
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  align-items: start;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 8px;
  background-color: #fff;
`;

const Avatar = styled.img`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-top: 3px;
  margin-right: 8px;

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 40px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 6px;
  /* margin-bottom: 8px; */
  border: none;
  outline: none;
  border-radius: 5px;
  box-sizing: border-box;
  resize: none;
  overflow: hidden;
  font-size: 14px;
  height: 34px;

  &:focus {
    outline: none; /* 포커스 시에도 테두리가 생기지 않도록 함 */
  }
`;

const CharCount = styled.div`
  align-self: flex-end;
  font-size: 11px;
  color: #999;
  margin-right: 8px;

  @media (min-width: 768px) {
    font-size: 12px;
  }
`;

const Button = styled.button<{ disabled: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#fbc02d")};
  /* margin-top: 3px; */
  margin-top: auto;
  margin-bottom: 3px;
  border: none;
  border-radius: 8px;
  padding: 8px 10px;
  color: #fff;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  @media (min-width: 768px) {
    padding: 8px 16px;
  }
`;
