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
import { fetchLeagueLike, fetchLeagueLikeDelete } from "@/api/board";
import { formatPostDate } from "@/utils/formatPostDate";
import Loading from "@/components/common/UI/Loading";
import NoCarPopup from "@/components/league/NoCarPopup";
import NoAuthority from "@/components/league/NoAuthority";
import LoginForm from "@/components/login/LoginForm";

export default function BoardDetailPage({
  params,
}: {
  params: { leagueName: string; boardId: string };
}) {
  const router = useRouter();

  const encodedLeagueName = params.leagueName;
  const leagueName = decodeURIComponent(encodedLeagueName);
  const boardId = params.boardId;

  const { activeTab, setActiveTab, userLeagueList } = useLeagueStore();
  const { isLoggedIn, user } = useAuthStore();

  const [boardDetail, setBoardDetail] = useState<BoardDetail | null>(null);
  const [commentList, setCommentList] = useState<fetchComment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showNoAuthority, setShowNoAuthority] = useState(false);

  const loadBoardDetail = async () => {
    try {
      const details = await fetchLeagueDetail(boardId);
      setBoardDetail(details);
      setIsLiked(details.like);
      setLikeCount(details.likeCount);
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

  const toggleLike = async () => {
    if (isLiked) {
      const likeData = await fetchLeagueLikeDelete(boardId);
      setLikeCount(likeData.likeCount);
      setIsLiked(likeData.isLike);
    } else {
      const likeData = await fetchLeagueLike(boardId);
      setLikeCount(likeData.likeCount);
      setIsLiked(likeData.isLike);
    }
  };

  const checkLeagueInUserList = () => {
    return userLeagueList.some((league) => league.name === leagueName);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
      setLoading(false);
    } else if (!user?.isAuth) {
      setShowPopup(true);
      setLoading(false);
      return;
    } else if (!checkLeagueInUserList()) {
      setShowNoAuthority(true);
      setLoading(false);
    }
    loadBoardDetail();
  }, [boardId, isLoggedIn, user]);

  useEffect(() => {
    const loadBoardData = async () => {
      const findActiveTab = userLeagueList.find((t) => t.name === leagueName);

      if (findActiveTab) {
        setActiveTab(findActiveTab);
        await loadCommentDetail(findActiveTab.id);
        setLoading(false);
      } else {
        if (!user?.isAuth) {
          setShowPopup(true);
        } else {
          setShowNoAuthority(true);
        }
        setLoading(false);
      }
    };

    if (isLoggedIn && user?.isAuth) {
      if (activeTab.id) {
        loadCommentDetail(activeTab.id);
        setLoading(false);
      } else {
        loadBoardData();
      }
    }
  }, [activeTab, boardId, leagueName, setActiveTab, isLoggedIn, user]);

  const handleCommentAdded = async () => {
    if (activeTab && activeTab.id) {
      await loadCommentDetail(activeTab.id);
    }
  };

  const handleDelete = async () => {
    try {
      const isDelete = confirm("정말 삭제하실건가요?");
      if (!isDelete) {
        return;
      }
      await fetchBoardDelete(boardId);
      router.push(`/league/${leagueName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowLogin(false);
    setShowNoAuthority(false);
    router.back();
  };
  const closeLoginPopup = () => {
    router.back();
  };

  if (loading || !boardDetail || !commentList) {
    if (showLogin) {
      return (
        <PopupContainer onClick={closePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={closePopup}>×</CloseIcon>
            <LoginForm />
          </PopupContent>
        </PopupContainer>
      );
    }
    if (showPopup) {
      return <NoCarPopup closePopup={closePopup} />;
    }
    if (showNoAuthority) {
      return <NoAuthority closePopup={closePopup} />;
    }
    return <Loading />;
  }

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
      {showPopup && <NoCarPopup closePopup={closePopup} />}
      {showLogin && (
        <PopupContainer onClick={closePopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={closePopup}>×</CloseIcon>
            <LoginForm />
          </PopupContent>
        </PopupContainer>
      )}
      {showNoAuthority && <NoAuthority closePopup={closePopup} />}
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

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 60%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 20px;
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
