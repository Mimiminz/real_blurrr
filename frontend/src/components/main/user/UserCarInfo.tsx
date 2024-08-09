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
        <InfoSection>
          <UserName>{user?.nickname}</UserName>
          {/* <CarModel>{userCarType.name}</CarModel> */}
          <CarModel>제네시스 G80 2024</CarModel>
        </InfoSection>
      </ProfileSection>
      {/* <ButtonSection>
        <LeagueButton
          onClick={() => handleUserLeagueClick(userLeagueList[0].name)}
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
  border-radius: 12px;
  padding: 10px 14px;
  /* box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9c1; */
  margin: 0 10px;

  @media (min-width: 480px) {
    padding: 28px;
  }

  @media (min-width: 768px) {
    margin-right: 30px;
    padding: 10px 16px;
  }

  @media (min-width: 1048px) {
    padding: 28px 80px 28px 20px;
  }
`;

const ProfileSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  margin-right: auto;
`;

const InfoSection = styled.div`
  text-align: start;
`;

const UserName = styled.h2`
  font-size: 16px;
  color: #333;
  margin: 18px 0 10px 0;
`;

const CarModel = styled.p`
  font-size: 15px;
  color: #333;
  margin: 0;
`;

// const ButtonSection = styled.div`
//   display: flex;
//   justify-content: center;
// `;

// const LeagueButton = styled.button`
//   background: #fff;
//   border: 1px solid #e5e7eb;
//   border-radius: 8px;
//   padding: 12px 24px;
//   margin: 0 10px;
//   cursor: pointer;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
//   font-size: 11px;

//   &:hover {
//     background: #f5f5f5;
//   }
//   @media (min-width: 1440px) {
//     width: 40%;
//     font-size: 14px;
//   }

//   svg {
//     margin-left: 5px;
//     color: ${({ theme }) => theme.colors.main};
//   }
// `;
