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
  onCommentAdded,
}: CommentListProps) {
  return (
    <CommentContainer>
      <CommentNumber>
        <LiaCommentDots />
        {/* {comments.commentCount} */}
      </CommentNumber>
      <CreateComment
        boardId={boardId}
        isReply={false}
        commentId=""
        onCommentAdded={onCommentAdded}
      />
      {comments.map((comment) => (
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
  padding-left: 20px;
`;

const CommentNumber = styled.div`
  margin-top: 10px;
  font-size: 18px;

  svg {
    margin-right: 5px;
    margin-top: 12px;
  }
`;

const CommentWrapper = styled.div`
  width: 100%;
`;
