import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import LeagueBoardListItem from "./LeagueBoardListItem";
import { fetchLeagueBoardList } from "@/api/league";
import { useEffect, useState } from "react";
import { boardListProp, LeagueBoardItem } from "@/types/leagueTypes";
import { useLeagueStore } from "@/store/leagueStore";
import NoCarPopup from "../NoCarPopup";
import { useAuthStore } from "@/store/authStore";
import LoginForm from "@/components/login/LoginForm";
import NoAuthority from "../NoAuthority";

const LeagueBoardList = ({ leagueName, boardList }: boardListProp) => {
  const router = useRouter();
  const { userLeagueList } = useLeagueStore();
  const { isLoggedIn, user } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showNoAuthority, setShowNoAuthority] = useState(false);

  const handleCardClick = (id: string, channelId?: string) => {
    const hasAccess = userLeagueList.some(
      (league) => league.name === leagueName
    );
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    } else if (!user?.isAuth) {
      setShowPopup(true);
      return;
    } else if (!hasAccess) {
      setShowNoAuthority(true);
      return;
    }

    router.push(`${leagueName}/${id}`);
  };

  const closePopup = () => {
    setShowPopup(false);
    setShowNoAuthority(false);
  };

  const closeLoginPopup = () => {
    setShowLogin(false);
  };

  return (
    <>
      <BoardList>
        {boardList && boardList.length === 0 ? (
          <EmptyMessage>게시글이 없습니다.</EmptyMessage>
        ) : (
          boardList.map((item) => (
            <div key={item.id} onClick={() => handleCardClick(item.id)}>
              <LeagueBoardListItem
                key={item.id}
                title={item.title}
                writer={item.member.nickname}
                writerCar={item.member.carTitle}
                createdAt={item.createdAt}
                likeCount={item.likeCount}
                commentCount={item.commentCount}
                viewCount={item.viewCount}
              />
            </div>
          ))
        )}
      </BoardList>
      {showPopup && <NoCarPopup closePopup={closePopup} />}
      {showLogin && (
        <ModalOverlay onClick={closeLoginPopup}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <LoginForm closeLoginModal={closeLoginPopup} />
            <CloseIcon onClick={closeLoginPopup}>×</CloseIcon>
          </ModalContent>
        </ModalOverlay>
      )}
      {showNoAuthority && <NoAuthority closePopup={closePopup} />}
    </>
  );
};

const EmptyMessage = styled.p`
  padding: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;

const BoardList = styled.div`
  // 스타일 정의
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

export default LeagueBoardList;
