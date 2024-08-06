"use client";

import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import BoardDetailTitle from "@/components/channel/board/BoardDetailTitle";
import { useAuthStore } from "@/store/authStore";
import { PostDetail, Comment as CommentProp } from "@/types/channelType";
import { fetchComment } from "@/types/commentTypes";
import { fetchChannelPostDetail } from "@/api/channel";
import CommentList from "@/components/common/UI/comment/CommentList";
import { fetchCommentList } from "@/api/comment";
import {
  fetchChannelLike,
  fetchChannelLikeDelete,
  fetchLeaugueLikeState,
} from "@/api/board";

export default function ChannelBoardDetailPage({
  params,
}: {
  params: { channelId: string; boardId: string };
}) {
  const channelId = params.channelId;
  const boardId = params.boardId;

  const [boardDetail, setBoardDetail] = useState<PostDetail | null>(null);
  const [commentList, setCommentList] = useState<fetchComment | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, user } = useAuthStore();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const toggleLike = async () => {
    if (isLiked) {
      const likeData = await fetchChannelLikeDelete(boardId);
      setLikeCount(likeData.likeCount);
      setIsLiked(likeData.isLike);
    } else {
      const likeData = await fetchChannelLike(boardId);
      setLikeCount(likeData.likeCount);
      setIsLiked(likeData.isLike);
    }
    // setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  const formatPostDate = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      return postDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return postDate.toISOString().split("T")[0].replace(/-/g, ".");
    }
  };

  const loadBoardDetail = useCallback(async () => {
    try {
      const details = await fetchChannelPostDetail(boardId, channelId);
      setBoardDetail(details);
      setLikeCount(details.likeCount);
      setIsLiked(details.liked);
    } catch (error) {
      console.error(error);
      setError("Failed to load post details. Please try again later.");
    }
  }, [boardId, channelId]);

  const loadCommentDetail = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      const fetchCommentsList = await fetchCommentList(boardId);
      setCommentList(fetchCommentsList);
    } catch (error) {
      console.log(error);
    }
  }, [boardId, isLoggedIn]);

  const handleDelete = async () => {
    try {
      // await fetchBoardDelete(boardId);
      // const isDelete = confirm("정말 삭제하실건가요?");
      // if (!isDelete) {
      //   return;
      // }
      // router.push(`/league/${leagueName}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBoardDetail();
    loadCommentDetail();
  }, [loadBoardDetail, loadCommentDetail]);

  if (!boardDetail) {
    return <div>{error ? error : "Loading..."}</div>;
  }

  return (
    <>
      <BoardDetailTitle
        title={boardDetail.title}
        createdAt={formatPostDate(boardDetail.createdAt)}
        viewCount={boardDetail.viewCount}
        likeCount={likeCount}
        member={boardDetail.member}
        tags={boardDetail.mentionedLeagues}
      />
      <Content dangerouslySetInnerHTML={{ __html: boardDetail.content }} />
      <CommentContainer>
        <WriterContainer>
          <HeartButton onClick={toggleLike}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </HeartButton>
          {user?.nickname === boardDetail.member.nickname && (
            <WriterButton onClick={handleDelete}>삭제</WriterButton>
          )}
        </WriterContainer>
        <CommentList
          comments={commentList?.comments || []}
          commentCount={boardDetail.commentCount}
          boardId={boardId}
          leagueId=""
          isLeague={false}
          onCommentAdded={loadCommentDetail}
        />
      </CommentContainer>
    </>
  );
}

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  padding-bottom: 50px;
  border-top: 1px solid #bebebe;
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #bebebe;
`;

const WriterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const WriterButton = styled.p`
  padding: 0px;
  /* border-radius: 40px; */
  /* border: 1px solid #ddd; */
  font-size: 14px;
  background-color: white;
  margin: 5px 10px 20px 0;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

const HeartButton = styled.button`
  margin: 5px 0px 20px 0px;
  min-width: 30px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #666;
  display: flex;
  justify-content: center;

  &:hover {
    color: #666;
  }
`;
