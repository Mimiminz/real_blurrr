import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { MdPeopleAlt } from "react-icons/md";
import { useLeagueStore } from "@/store/leagueStore";

interface LeagueListItemProps {
  id: string;
  name: string;
  peopleCount: number;
}

const LeagueListItem: React.FC<LeagueListItemProps> = ({
  id,
  name,
  peopleCount,
}) => {
  const router = useRouter();
  const { userLeagueList } = useLeagueStore();

  const isUserInLeague = userLeagueList.some((league) => league.name === name);

  const handleClick = () => {
    router.push(`/league/${name}`);
  };
  return (
    <CardContainer
      onClick={handleClick}
      className={isUserInLeague ? "myLeague" : ""}
    >
      <Title className={name.length > 6 ? "long-name" : ""}>{name}</Title>
      <CountContainer>
        <Icon>
          <MdPeopleAlt />
        </Icon>
        <Count>{peopleCount}</Count>
      </CountContainer>
    </CardContainer>
  );
};

export default LeagueListItem;

const CardContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.articleDivider};
  width: 80px;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    background: #ffedd5;
    transition: 0.3s ease-in-out;
    transform: translateY(-5px) scale(1.05);
  }

  &.myLeague {
    background: linear-gradient(135deg, #ffedd5, #ffd7ba); /* 그라데이션 적용 */
    border-color: #ff900d; /* 테두리 색상 */
    box-shadow: 0 2px 8px rgba(234, 88, 12, 0.4); /* 그림자 */
    transform: scale(1.05);
    position: relative;

    &::after {
      content: "My League";
      position: absolute;
      top: -10px;
      right: -10px;
      background-color: #FF900D; /* 배지 색상 */
      color: white;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 6px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
  }
`;

const Title = styled.h3`
  font-size: 14px;
  /* color: #000; */
  margin-bottom: 8px;
  margin-top: 0px;

  &.long-name {
    font-size: 11px;
  }
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.subDiscription};
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 아이콘 크기 조정 */
  vertical-align: middle;
`;

const Count = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subDiscription};
`;
