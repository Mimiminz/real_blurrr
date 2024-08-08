import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { GoArrowUpRight } from "react-icons/go";
import { LeagueList } from "@/types/leagueTypes";
import { useAuthStore } from "@/store/authStore";

interface UserCarProps {
  userLeagueList: LeagueList[];
}

const UserCarInfo: React.FC<UserCarProps> = ({ userLeagueList }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const handleUserLeagueClick = (tabName: string) => {
    router.push(`/league/${tabName}`);
  };

  const userCarType = userLeagueList.find((t) => t.type === "MODEL");
  console.log(userCarType);

  if (!userCarType) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <ProfileSection>
        <ProfileImage src={user?.profileUrl} alt="User Profile" />
        <CarInfo>
          {/* <CarModel>“{userCarType.name}” 오너</CarModel> */}
          <CarModel>“벤츠 GLS 600 4MATIC MANUFAKTUR 2024” 오너</CarModel>
          <UserName>{user?.nickname}님!</UserName>
        </CarInfo>
      </ProfileSection>
      {/* <ButtonSection>
        <LeagueButton
          onClick={() => handleUserLeagueClick(userLe`agueList[0].name)}
        >
          {userLeagueList[0].name} 리그 <GoArrowUpRight />
        </LeagueButton>
        <LeagueButton
          onClick={() => handleUserLeagueClick(userLeagueList[1].name)}
        >
          {userLeagueList[1].name} 리그 <GoArrowUpRight />
        </LeagueButton>
      </ButtonSection> */}
    </Container>
  );
};

export default UserCarInfo;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 12px;
  padding: 10px 14px;
  /* border: 2px solid #00000039; */
  box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9c1;
  margin: 0 10px;

  @media (min-width: 480px) {
    /* width: 70%; */
    padding: 28px;
  }

  @media (min-width: 768px) {
    margin-right: 30px;
    padding: 10px 16px;

    /* width: 48%; */
  }

  @media (min-width: 1024px) {
    /* width: 50%; */
  }

  @media (min-width: 1440px) {
    /* width: 70%; */
    padding: 28px 20px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-bottom: 30px; */
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  /* margin-right: 30px; */
  margin-right: 18px;
`;

const CarInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CarModel = styled.h2`
  font-size: 16px;
  color: #333;
  margin: 0;
  padding-top: 10px;
`;

const UserName = styled.p`
  font-size: 15px;
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
  padding: 12px 24px;
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
    color: ${({ theme }) => theme.colors.main};
  }
`;
