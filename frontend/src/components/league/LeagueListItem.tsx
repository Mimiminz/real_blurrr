import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import { MdPeopleAlt } from "react-icons/md";

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

  const handleClick = () => {
    router.push(`/league/${name}`);
  };
  return (
    <CardContainer onClick={handleClick}>
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

  &:hover {
    background: #ffedd5;
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
