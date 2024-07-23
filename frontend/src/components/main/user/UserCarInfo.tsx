import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import dummy from "@/db/mainPageData.json";

const userInfo = dummy.userInfo;

const UserCarInfo: React.FC = () => {
  const router = useRouter();

  const handleLeagueClick = () => {
    router.push("/league");
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
        <LeagueButton onClick={handleLeagueClick}>
          {userInfo.carModel} <br />
          리그 <Arrow>↗</Arrow>
        </LeagueButton>
        <LeagueButton onClick={handleLeagueClick}>
          {userInfo.carManufacture} <br />
          리그 <Arrow>↗</Arrow>
        </LeagueButton>
      </ButtonSection>
    </Container>
  );
};

export default UserCarInfo;

const Container = styled.div`
  align-items: center;
  padding: 20px;
  margin: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
`;

const CarInfo = styled.div`
  text-align: left;
`;

const CarModel = styled.h2`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

const UserName = styled.p`
  font-size: 18px;
  color: #333;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LeagueButton = styled.button`
  background: #fff;
  width: 140px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }
`;

const Arrow = styled.span`
  margin-left: 5px;
  color: orange;
`;
