"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Breadcrumb from "@/components/common/UI/BreadCrumb";
import LeagueDetailTitle from "@/components/league/detail/LeagueDetailTitle";

import { BoardDetail, LeagueList, UserLeague } from "@/types/leagueTypes";
import { fetchLeagueDetail, fetchBoardDelete } from "@/api/league";

import { fetchComment } from "@/types/commentTypes";

import { useRouter } from "next/navigation";
import { useLeagueStore } from "@/store/leagueStore";
import { useAuthStore } from "@/store/authStore";
import { fetchLeagueCommentList } from "@/api/comment";
import { fetchUserLeagueList } from "@/api/league";
import CommentList from "@/components/common/UI/comment/CommentList";
import {
  fetchLeagueLike,
  fetchLeagueLikeDelete,
  fetchLeaugueLikeState,
} from "@/api/board";
// import { formatPostDate } from "@/utils/formatPostDate";

export default function BoardDetailPage({
  params,
}: {
  params: { leagueName: string; boardId: string };
}) {
  const router = useRouter();

  const encodedLeagueName = params.leagueName;
  const leagueName = decodeURIComponent(encodedLeagueName);
  const boardId = params.boardId;

  const { activeTab, brandLeagueList, userLeagueList, setActiveTab } =
    useLeagueStore();
  const { isLoggedIn, user } = useAuthStore();

  const [boardDetail, setBoardDetail] = useState<BoardDetail | null>(null);
  const [commentList, setCommentList] = useState<fetchComment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const formatPostDate = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      return postDate.toLocaleTimeString([], {
        hour12: false,
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

  const loadCommentDetail = async (leagueId: string) => {
    try {
      const fetchcommentsList = await fetchLeagueCommentList(leagueId, boardId);
      setCommentList(fetchcommentsList);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLike = async () => {
    try {
      const fetchLikeState = await fetchLeaugueLikeState(boardId);
      setIsLiked(fetchLikeState.isLike);
      setLikeCount(fetchLikeState.likeCount);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleLike = async () => {
    if (isLiked) {
      await fetchLeagueLikeDelete(boardId);
    } else {
      await fetchLeagueLike(boardId);
    }
    loadLike();
  };

  useEffect(() => {
    loadBoardDetail();
    loadLike();
  }, [boardId]);

  useEffect(() => {
    const loadBoardData = async () => {
      if (isLoggedIn && user?.isAuth) {
        const userLeagues: UserLeague[] = await fetchUserLeagueList();
        const userTabs: LeagueList[] = userLeagues.map((userLeague) => ({
          id: userLeague.league.id,
          name: userLeague.league.name,
          type: userLeague.league.type,
          peopleCount: userLeague.league.peopleCount,
        }));
        const findActiveTab = userTabs.find((t) => t.name === leagueName);

        if (findActiveTab) {
          setActiveTab(findActiveTab);
          await loadCommentDetail(findActiveTab.id);
          setLoading(false);
        } else {
          alert("인증받지 못한 리그입니다");
          router.back();
          return;
        }
      } else {
        alert("인증받지 못한 리그입니다");
        router.back();
        return;
      }
    };

    if (!activeTab.id) {
      loadBoardData();
    } else {
      loadCommentDetail(activeTab.id);
      setLoading(false);
    }
  }, [activeTab, boardId, leagueName, setActiveTab]);

  const handleCommentAdded = async () => {
    if (activeTab && activeTab.id) {
      await loadCommentDetail(activeTab.id);
    }
  };

  const handleDelete = async () => {
    try {
      await fetchBoardDelete(boardId);
      const isDelete = confirm("정말 삭제하실건가요?");
      if (!isDelete) {
        return;
      }
      router.push(`/league/${leagueName}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || !boardDetail || !commentList) {
    return <div>Loading...</div>;
  }

  console.log(boardDetail.createdAt);

  return (
    <>
      <BreadcrumbContainer>
        <Breadcrumb
          channel="리그"
          subChannel={leagueName}
          channelUrl={`/league/${leagueName}`}
        />
      </BreadcrumbContainer>
      <LeagueDetailTitle
        title={boardDetail.title}
        createdAt={formatPostDate(boardDetail.createdAt)}
        viewCount={boardDetail.viewCount}
        likeCount={likeCount}
        username={boardDetail.member.nickname}
        authorprofileUrl={boardDetail.member.profileUrl}
        authorCarTitle={boardDetail.member.carTitle}
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
          comments={commentList.comments}
          commentCount={commentList.commentCount}
          boardId={boardId}
          leagueId={activeTab.id}
          isLeague={true}
          onCommentAdded={handleCommentAdded}
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
