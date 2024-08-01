"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Breadcrumb from "@/components/common/UI/BreadCrumb";
import LeagueDetailTitle from "@/components/league/detail/LeagueDetailTitle";

import { BoardDetail } from "@/types/leagueTypes";
import { fetchLeagueDetail, fetchBoardDelete } from "@/api/league";

import { Comment } from "@/types/commentTypes";

import { useRouter } from "next/navigation";
import { useLeagueStore } from "@/store/leagueStore";
import { fetchCommentList } from "@/api/comment";
import CommentList from "@/components/common/UI/comment/CommentList";

export default function BoardDetailPage({
  params,
}: {
  params: { leagueId: string; boardId: string };
}) {
  const router = useRouter();

  const leagueId = params.leagueId;
  const boardId = params.boardId;

  const { activeTabName, brandLeagueList, userLeagueList, setActiveTabName } =
    useLeagueStore();

  const [boardDetail, setBoardDetail] = useState<BoardDetail | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const formatPostDate = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      return postDate.toLocaleDateString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return postDate.toISOString().split("T")[0].replace(/-/g, ".");
    }
  };

  const loadBoardDetail = async () => {
    try {
      const details = await fetchLeagueDetail(boardId);
      setBoardDetail(details);
    } catch (error) {
      console.log(error);
    }
  };
  const loadCommentDetail = async () => {
    try {
      const commentsList = await fetchCommentList(boardId);
      setComments(commentsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadBoardDetail();
    loadCommentDetail();
  }, [boardId]);

  useEffect(() => {
    if (!activeTabName || activeTabName === `${undefined} 리그`) {
      const name = `${
        brandLeagueList.find((t) => t.id === leagueId)?.name ||
        userLeagueList.find((t) => t.id === leagueId)?.name
      } 리그`;
      setActiveTabName(name);
    }
  }, [
    activeTabName,
    brandLeagueList,
    userLeagueList,
    leagueId,
    setActiveTabName,
  ]);

  const handleDelete = async () => {
    try {
      await fetchBoardDelete(boardId);
      const isDelete = confirm("정말 삭제하실건가요?");
      if (!isDelete) {
        return;
      }
      router.push(`/league/${leagueId}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!boardDetail) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb
          channel="리그"
          subChannel={activeTabName}
          channelUrl={`/league/${leagueId}`}
        />
      </BreadcrumbContainer>
      <LeagueDetailTitle
        title={boardDetail.title}
        createdAt={formatPostDate(boardDetail.createdAt)}
        viewCount={boardDetail.viewCount}
        likeCount={boardDetail.likeCount}
        username={boardDetail.member.nickname}
        authorprofileUrl={boardDetail.member.profileUrl}
        authorCarTitle={boardDetail.member.carTitle}
      />
      <Content dangerouslySetInnerHTML={{ __html: boardDetail.content }} />
      <HeartButton onClick={toggleLike}>
        {isLiked ? <FaHeart /> : <FaRegHeart />}
      </HeartButton>
      <CommentContainer>
        <WriterContainer>
          <WriterButton onClick={handleDelete}>삭제</WriterButton>
        </WriterContainer>
        <CommentList
          comments={comments}
          boardId={boardId}
          onCommentAdded={loadCommentDetail}
        />
      </CommentContainer>
    </>
  );
}

const BreadcrumbContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  padding-bottom: 50px;
  border-top: 1px solid #bebebe;
`;

const CommentNumber = styled.div`
  margin-top: 10px;
  font-size: 18px;

  svg {
    margin-right: 5px;
    margin-top: 12px;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 20px;
  border-top: 1px solid #bebebe;
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
