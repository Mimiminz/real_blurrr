import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { LeagueList } from "@/types/leagueTypes";
import { useAuthStore } from "@/store/authStore";

import { FaCar } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import { useLeagueStore } from "@/store/leagueStore";

const UserCarInfo: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { userLeagueList } = useLeagueStore();
  const [modelLeague, setModelLeague] = useState<LeagueList | undefined>();
  const [brandLeague, setBrandLeague] = useState<LeagueList | undefined>();

  const handleUserLeagueClick = (tabName: string) => {
    router.push(`/league/${tabName}`);
  };

  useEffect(() => {
    userLeagueList.forEach((league: LeagueList) => {
      if (league.type === "MODEL") {
        setModelLeague(league);
      } else if (league.type === "BRAND") {
        setBrandLeague(league);
      }
    });
  }, [userLeagueList]);

  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={user?.profileUrl} alt="User Profile" />

        <InfoSection>
          <UserName>{user?.nickname}</UserName>
          {user?.carTitle && (
            <CarModel isLong={user?.carTitle.length > 21}>
              {user?.carTitle}
            </CarModel>
          )}
        </InfoSection>
      </ProfileSection>
      <LeagueSection>
        <LeagueItem>
          <LeagueTitle>모델 리그</LeagueTitle>
          {modelLeague?.name ? (
            <ClickableLeagueName
              onClick={() => handleUserLeagueClick(modelLeague.name)}
            >
              <FaCar />
              {modelLeague.name}
            </ClickableLeagueName>
          ) : (
            <NonClickableLeagueName>없음</NonClickableLeagueName>
          )}
        </LeagueItem>
        <LeagueItem>
          <LeagueTitle>브랜드 리그</LeagueTitle>
          {brandLeague?.name ? (
            <ClickableLeagueName
              onClick={() => handleUserLeagueClick(brandLeague.name)}
            >
              <MdFactory />
              {brandLeague.name}
            </ClickableLeagueName>
          ) : (
            <NonClickableLeagueName>없음</NonClickableLeagueName>
          )}
        </LeagueItem>
      </LeagueSection>
    </Container>
  );
};

export default UserCarInfo;

const Container = styled.div`
  border-radius: 20px;
  /* background-color: #c8e6c9; */
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin: 0 10px;
  padding: 20px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1); */

  @media (min-width: 768px) {
    margin-left: 20px;
    max-width: 270px;
  }

  @media (min-width: 1024px) {
    width: 270px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  margin-right: auto;
  background-color: #e5e7eb;
`;

const InfoSection = styled.div`
  text-align: start;
`;

const UserName = styled.h2`
  font-size: 16px;
  color: #333;
  margin: 6px 0 6px 0;
`;

const CarModel = styled.p<{ isLong: boolean }>`
  font-size: ${(props) => (props.isLong ? "12px" : "14px")};
  color: #333;
  margin: 0;
`;

const LeagueSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 20px;
`;

const LeagueItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  margin: 5px 0;
`;

const LeagueTitle = styled.p`
  margin: 0;
  margin-right: 20px;
`;

const ClickableLeagueName = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  color: black;

  &:hover {
    color: #ff900d;
  }

  svg {
    margin-right: 5px;
  }
`;

const NonClickableLeagueName = styled.p`
  margin: 0;
  color: #888;
`;
