import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import dummy from "@/db/mainPageData.json";
import { GoArrowUpRight } from "react-icons/go";

const userInfo = dummy.userInfo;

const UserCarInfo: React.FC = () => {
  const router = useRouter();

  const handleLeagueClick = () => {
    router.push("/league");
  };

  const handleUserLeagueClick = (tabId: string) => {
    router.push(`/league?tab=${tabId}`);
  };

  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={userInfo.profileImage} alt="User Profile" />
        <CarInfo>
          <CarModel>“{userInfo.carModel}” 오너</CarModel>
          <UserName>{userInfo.name}님! 어서오세요~</UserName>
        </CarInfo>
      </ProfileSection>
      <ButtonSection>
        <LeagueButton>
        {userInfo.carModel} <br />
          리그 <GoArrowUpRight />
        </LeagueButton>
        <LeagueButton>
          {userInfo.carManufacture} <br />
          리그 <GoArrowUpRight />
        </LeagueButton>
      </ButtonSection>
    </Container>
  );
};

export default UserCarInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 28px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin-left: 10px;
  
  @media (min-width: 480px) {
    width: 70%;
  }
  
  @media (min-width: 768px) {
    margin-right: 30px;
    width: 48%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }

  @media (min-width: 1440px) {
    width: 70%;
    padding: 28px 20px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 30px;
`;

const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CarModel = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
  padding-top: 10px;
`;

const UserName = styled.p`
  font-size: 18px;
  color: #333;
  margin-top: 10px;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
`;

const LeagueButton = styled.button`
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 11px;

  &:hover {
    background: #f5f5f5;
  }
  @media (min-width: 1440px) {
    width: 40%;
    font-size: 14px;
  }

  svg {
    margin-left: 5px;
    color: orange;
  }
`;

