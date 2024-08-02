"use client"

import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { LiaCommentDots } from 'react-icons/lia';
import BoardDetailTitle from '@/components/channel/board/BoardDetailTitle';
import { PostDetail, Comment as CommentProp, CommentStatus } from "@/types/channelType";
import { fetchChannelPostDetail } from "@/api/channel";

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  padding-bottom: 20px;
  border-top: 1px solid #bebebe;
`;

const CommentNumber = styled.div`
  svg {
    margin-right: 5px;
  }
`;

const CreateCommentContainer = styled.div`
  margin: 16px 0px;
`;

const WriterContainer = styled.div`
  display: flex;
  justify-content: end;
`;

const WriterButton = styled.button`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  margin-right: 10px;
  cursor: pointer;
`;

const CommentWrapper = styled.div`
  width: 100%;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  border-top: 1px solid #bebebe;
`;

const HeartButton = styled.button`
  margin: 5px 0px 20px auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #666;
  display: flex;
  justify-content: flex-end;

  &:hover {
    color: #666;
  }
`;

export default function ChannelBoardDetailPage({ params }: { params: { channelId: string; boardId: string } }) {
   const channelId = params.channelId;
   const boardId = params.boardId;

   const [boardDetail, setBoardDetail] = useState<PostDetail | null>(null);
   const [isLiked, setIsLiked] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const toggleLike = () => {
      setIsLiked((prevIsLiked) => !prevIsLiked);
   };

   const formatPostDate = (createdAt: string) => {
      const postDate = new Date(createdAt);
      const today = new Date();

      if (postDate.toDateString() === today.toDateString()) {
         return postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
         return postDate.toISOString().split('T')[0].replace(/-/g, '.');
      }
   };

   const loadBoardDetail = useCallback(async () => {
      try {
         const details = await fetchChannelPostDetail(boardId, channelId);
         setBoardDetail(details);
      } catch (error) {
         console.error(error);
         setError("Failed to load post details. Please try again later.");
      }
   }, [boardId, channelId]);

   useEffect(() => {
      loadBoardDetail();
   }, [boardId, channelId]);

   if (!boardDetail) {
      return <div>{error ? error : 'Loading...'}</div>;
   }

   return (
      <>
         <BoardDetailTitle
            title={boardDetail.title}
            createdAt={formatPostDate(boardDetail.createdAt)}
            viewCount={boardDetail.viewCount}
            likeCount={boardDetail.likeCount}
            member={boardDetail.member}
            tags={boardDetail.mentionedLeagues}
         />
         <Content>
            {boardDetail.content}
         </Content>
         <HeartButton onClick={toggleLike}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
         </HeartButton>
         <CommentContainer>
            <WriterContainer>
               <WriterButton>수정</WriterButton>
               <WriterButton>삭제</WriterButton>
            </WriterContainer>
            {/* <CommentNumber>
               <LiaCommentDots />
               {boardDetail.commentCount}
            </CommentNumber>
            <CreateCommentContainer>
               <CreateComment boardId={boardId} isReply={false} commentId="" onCommentAdded={loadBoardDetail} />
            </CreateCommentContainer>
            {boardDetail.comments.map((comment) => (
               <React.Fragment key={comment.id}>
                  {comment.status === CommentStatus.ACTIVE ? (
                     <CommentWrapper>
                        <Comment
                           id={comment.id}
                           boardId={boardId}
                           avatarUrl={comment.member.profileUrl}
                           userName={comment.member.nickname}
                           userDetail={comment.member.carTitle}
                           text={comment.content}
                           time={comment.createdAt}
                           onCommentAdded={loadBoardDetail}
                        />
                     </CommentWrapper>
                  ) : (
                     <div style={{ color: '#999', margin: '10px 0' }}>삭제된 댓글입니다.</div>
                  )}
                  {comment.replies.length > 0 && (
                     comment.replies.map((reply) => (
                        <Reply
                           key={reply.id}
                           id={reply.id}
                           boardId={boardId}
                           avatarUrl={reply.member.profileUrl}
                           userName={reply.member.nickname}
                           userDetail={reply.member.carTitle}
                           text={reply.content}
                           time={reply.createdAt}
                           onCommentAdded={loadBoardDetail}
                        />
                     ))
                  )}
               </React.Fragment>
            ))}
            <CommentList
          comments={commentList.comments}
          commentCount={commentList.commentCount}
          boardId={boardId}
          onCommentAdded={loadCommentDetail}
        /> */}
         </CommentContainer>
      </>
   );
}
