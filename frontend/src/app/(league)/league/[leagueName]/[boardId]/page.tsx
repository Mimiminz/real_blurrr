"use client";

import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
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

  const previousBoardIdRef = useRef<string | null>(null);
  const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 상태 추가

  const loadCommentDetail = async (leagueId: string) => {
    try {
      const fetchcommentsList = await fetchLeagueCommentList(leagueId, boardId);
      setCommentList(fetchcommentsList);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      setShowLogin(true);
      setLoading(false);
      return;
    }

    if (!user?.isAuth) {
      setShowPopup(true);
      setLoading(false);
      return;
    }

    if (
      userLeagueList.length > 0 &&
      !userLeagueList.some((league) => league.name === leagueName)
    ) {
      setShowNoAuthority(true);
      setLoading(false);
      return;
    }
  }, [isLoggedIn, user, userLeagueList, leagueName]);

  useEffect(() => {
    const loadDetails = async () => {
      if (previousBoardIdRef.current !== boardId) {
        previousBoardIdRef.current = boardId;

        try {
          const details = await fetchLeagueDetail(boardId);
          setBoardDetail(details);
          setIsLiked(details.isLike);
          setLikeCount(details.likeCount);

          const findActiveTab = userLeagueList.find(
            (t) => t.name === leagueName
          );

          if (findActiveTab) {
            setActiveTab(findActiveTab);
            await loadCommentDetail(findActiveTab.id);
          }
        } catch (error) {
          throw error;
        } finally {
          setLoading(false);
        }
      }
    };

    if (
      user?.isAuth &&
      userLeagueList.some((league) => league.name === leagueName)
    ) {
      loadDetails();
    }

    setLoading(false);
  }, [boardId, activeTab, leagueName, userLeagueList]);

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

  const handleCommentAdded = async () => {
    if (activeTab && activeTab.id) {
      await loadCommentDetail(activeTab.id);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowNoAuthority(false);
    router.push("/");
  };

  const closeLoginPopup = () => {
    setShowLogin(false);
    setShowNoAuthority(false);
  };

  const closeNoLoginPopup = () => {
    setShowLogin(false);
    router.push("/");
  };

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 클라이언트에 마운트되었음을 표시
  }, []);

  if (!isMounted || !boardDetail || !commentList) {
    if (showLogin) {
      return (
        <ModalOverlay onClick={closePopup}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <LoginForm closeLoginModal={closeLoginPopup} />
            <CloseIcon onClick={closeNoLoginPopup}>×</CloseIcon>
          </ModalContent>
        </ModalOverlay>
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
        boardId={boardId}
        leagueName={leagueName}
      />
      <Content dangerouslySetInnerHTML={{ __html: boardDetail.content }} />
      <WriterContainer>
        {isLoggedIn && (
          <HeartButton onClick={toggleLike} $isLiked={isLiked}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
            좋아요
          </HeartButton>
        )}
      </WriterContainer>
      <CommentContainer>
        <CommentList
          comments={commentList.comments}
          commentCount={commentList.commentCount}
          boardId={boardId}
          leagueId={activeTab.id}
          isLeague={true}
          onCommentAdded={handleCommentAdded}
          boardAuthor={boardDetail.member.nickname}
        />
      </CommentContainer>
      <ListButton onClick={() => router.push(`/league/${leagueName}`)}>
        &lt; 목록으로
      </ListButton>
    </>
  );
}

const BreadcrumbContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  padding: 16px 16px 40px 16px;
  border-top: 1px solid #bebebe;

  @media (min-width: 480px) {
    font-size: 17px;
    padding: 20px 20px 50px 20px;
  }

  img {
    width: 100%;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #bebebe;
`;

const WriterContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
  /* margin-left: 20px; */
`;

const WriterButton = styled.p`
  padding: 0px;
  font-size: 17px;
  background-color: white;
  margin: 5px 10px 20px 0;
  cursor: pointer;

  &:hover {
    color: #666;
  }
`;

const HeartButton = styled.button<{ $isLiked: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  /* color: ${({ $isLiked }) => ($isLiked ? "#d60606" : "#333")}; */
  font-size: 14px;

  &:hover {
    background-color: #ebebeb;
  }

  svg {
    margin-right: 5px;
    font-size: 17px;
    /* color: ${({ $isLiked }) => ($isLiked ? "#d60606" : "#333")}; */
    color: #d60606;
  }
`;

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

// 모달창
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 90%;
  max-width: 500px;
  height: 100%;
  padding: 10px;
  overflow: hidden;

  animation: ${fadeIn} 300ms ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 300ms ease-in-out;
  }

  @media (min-width: 480px) {
    width: 100%;
    height: 500px;
    padding: 15px;
  }

  @media (min-width: 768px) {
    width: 90%;
    height: 500px;
    padding: 10px;
  }

  @media (min-width: 1024px) {
    width: 90%;
    height: 600px;
    padding: 10px;
  }

  @media (min-width: 1440px) {
    width: 90%;
    height: 600px;
    padding: 10px;
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

const ListButton = styled.div`
  max-width: 80px;
  margin-top: 130px;
  padding: 12px 13px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  background-color: #fff;
  color: #121212;
  text-align: center;
  white-space: nowrap;
  transition: background-color 0.3s ease, transform 0.2s ease;
`;
