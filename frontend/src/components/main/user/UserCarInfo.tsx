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
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    if (user?.profileUrl) {
      setProfileUrl(user.profileUrl);
    } else {
      setProfileUrl("");
    }
  }, [user]);

  const handleUserLeagueClick = (tabName: string) => {
    router.push(`/league/${tabName}`);
  };

  const handleCarCertification = () => {
    router.push("/carcertification");
  };

  const carTitle = user?.carTitle || "뚜벅이";

  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={user?.profileUrl} alt="User Profile" />

        <InfoSection>
          <UserName>{user?.nickname}</UserName>
          <CarModel className={carTitle.length > 21 ? "long-title" : ""}>
            {carTitle}
          </CarModel>
        </InfoSection>
      </ProfileSection>
      <LeagueSection>
        {userLeagueList.length > 0 ? (
          <>
            <LeagueItem>
              <LeagueTitle>모델 리그</LeagueTitle>
              <ClickableLeagueName
                onClick={() => handleUserLeagueClick(userLeagueList[0]?.name)}
              >
                <FaCar />
                {userLeagueList[0]?.name}
              </ClickableLeagueName>
            </LeagueItem>
            <LeagueItem>
              <LeagueTitle>브랜드 리그</LeagueTitle>
              <ClickableLeagueName
                onClick={() => handleUserLeagueClick(userLeagueList[1]?.name)}
              >
                <MdFactory />
                {userLeagueList[1]?.name}
              </ClickableLeagueName>
            </LeagueItem>
          </>
        ) : (
          <NonClickableLeague onClick={handleCarCertification}>
            자동차 등록하러 가기
          </NonClickableLeague>
        )}
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
    width: 270px;
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

const CarModel = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;

  &.long-title {
    font-size: 12px;
  }
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

const NonClickableLeague = styled.div`
  margin: 0;
  /* background-color: #f7f8f9; */
  border-radius: 10px;
  border: 1px solid #1212127b;
  height: 40px;
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center; 
  cursor: pointer;
  font-weight: bold;
  color: black;

  &:hover {
    color: #ff900d;
  }
`;
