import React from "react";
import styled from "styled-components";
import { FaRegComment } from "react-icons/fa6";

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

  const handleLoginRedirect = () => {
    router.push("/login"); // 로그인 페이지 경로로 이동
  };

  console.log(comments)

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
          {comments.length > 0 &&
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
          <LoginButton onClick={handleLoginRedirect}>로그인</LoginButton>
        </LoginMessage>
      )}
    </CommentContainer>
  );
}

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
