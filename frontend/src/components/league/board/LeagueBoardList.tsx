import styled from "styled-components";
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
        {boardList.map((item) => (
          <div key={item.id} onClick={() => handleCardClick(item.id)}>
            <LeagueBoardListItem
              key={item.id}
              title={item.title}
              writer={item.member.nickname}
              writerCar={item.member.carTitle}
              createdAt={item.createdAt}
              likeCount={item.likeCount}
              commentCount={item.commentCount}
            />
          </div>
        ))}
      </BoardList>
      {showPopup && <NoCarPopup closePopup={closePopup} />}
      {showLogin && (
        <PopupContainer onClick={closeLoginPopup}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={closeLoginPopup}>×</CloseIcon>
            <LoginForm />
          </PopupContent>
        </PopupContainer>
      )}
      {showNoAuthority && <NoAuthority closePopup={closePopup} />}
    </>
  );
};

const BoardList = styled.div`
  // 스타일 정의
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

export default LeagueBoardList;
