import React, { useState } from "react";
import styled from "styled-components";
import { LiaCommentDots } from "react-icons/lia";

import { CommentListProps } from "@/types/commentTypes";

import CreateComment from "./CreateComment";
import CommentListItem from "./CommentListItem";
import NoComment from "./NoComment";
import Reply from "./Reply";

export default function CommentList({
  comments,
  boardId,
  leagueId,
  isLeague,
  onCommentAdded,
  commentCount,
}: CommentListProps) {
  return (
    <CommentContainer>
      <CommentNumber>
        <LiaCommentDots />
        {commentCount}
      </CommentNumber>
      <CreateComment
        boardId={boardId}
        isReply={false}
        commentId=""
        leagueId={leagueId}
        isLeague={isLeague}
        onCommentAdded={onCommentAdded}
      />
      {commentCount >= 0 &&
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
                    />
                  ) : (
                    <NoComment isReply={true} />
                  )}
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentNumber = styled.div`
  margin-top: 10px;
  font-size: 17px;
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
`;
