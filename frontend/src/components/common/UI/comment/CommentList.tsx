import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FaRegComment } from "react-icons/fa6";
import LoginForm from "@/components/login/LoginForm";

import { CommentListProps } from "@/types/commentTypes";

import CreateComment from "./CreateComment";
import CommentListItem from "./CommentListItem";
import NoComment from "./NoComment";
import Reply from "./Reply";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

export default function CommentList({
  comments,
  boardId,
  leagueId,
  isLeague,
  onCommentAdded,
  commentCount,
  boardAuthor,
}: CommentListProps) {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  const [showLogin, setShowLogin] = useState(false);

  const openLoginModal = () => setShowLogin(true);
  const closeLoginModal = () => setShowLogin(false);

  return (
    <CommentContainer>
      <CommentNumber>
        <FaRegComment />
        {commentCount}
      </CommentNumber>
      {isLoggedIn ? (
        <>
          <CreateComment
            boardId={boardId}
            isReply={false}
            commentId=""
            leagueId={leagueId}
            isLeague={isLeague}
            onCommentAdded={onCommentAdded}
          />
          {commentCount > 0 &&
            comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <CommentWrapper>
                  {comment.status === "ACTIVE" ? (
                    <CommentListItem
                      id={comment.id}
                      boardId={boardId}
                      avatarUrl={comment.member.profileUrl}
                      userName={comment.member.nickname}
                      userDetail={comment.member.carTitle}
                      text={comment.content}
                      time={comment.createdAt}
                      onCommentAdded={onCommentAdded}
                      isLeague={isLeague}
                      leagueId={leagueId}
                      boardAuthor={boardAuthor}
                    />
                  ) : (
                    <NoComment isReply={false} />
                  )}
                </CommentWrapper>
                {comment.replies.length > 0 &&
                  comment.replies.map((reply) => (
                    <React.Fragment key={reply.id}>
                      {reply.status === "ACTIVE" ? (
                        <Reply
                          id={reply.id}
                          boardId={boardId}
                          avatarUrl={reply.member.profileUrl}
                          userName={reply.member.nickname}
                          userDetail={reply.member.carTitle}
                          text={reply.content}
                          time={reply.createdAt}
                          onCommentAdded={onCommentAdded}
                          isLeague={isLeague}
                          leagueId={leagueId}
                          boardAuthor={boardAuthor}
                        />
                      ) : (
                        <NoComment isReply={true} />
                      )}
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
        </>
      ) : (
        <LoginMessage>
          로그인 뒤 확인하실 수 있습니다.
          <LoginButton onClick={openLoginModal}>로그인</LoginButton>
        </LoginMessage>
      )}

      {showLogin && (
        <ModalOverlay onClick={closeLoginModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <LoginForm closeLoginModal={closeLoginModal} />
            <CloseIcon onClick={closeLoginModal}>×</CloseIcon>
          </ModalContent>
        </ModalOverlay>
      )}
    </CommentContainer>
  );
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 20px; /* 추가된 스타일 */
`;

const CommentNumber = styled.div`
  margin-top: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }

  @media (min-width: 768px) {
    font-size: 17px;
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
`;

const LoginMessage = styled.div`
  margin: 50px 0;
  text-align: center;
  color: #555;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  background-color: #6b7280;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 20px auto;

  &:hover {
    background-color: #4b5563;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 50%;
  width: 100%;
  animation: ${fadeIn} 300ms ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 300ms ease-in-out;
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;
