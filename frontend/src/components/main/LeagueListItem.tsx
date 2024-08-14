import React from "react";
import styled from "styled-components";
import { MdPeopleAlt } from "react-icons/md";
import { useRouter } from "next/navigation";

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

  const islongname = name.length > 6;
  return (
    <CardContainer onClick={handleClick}>
      <Title className={name.length > 6 ? "long-name" : ""}>{name}</Title>
      <CountContainer>
        <MdPeopleAlt />
        {peopleCount}
      </CountContainer>
    </CardContainer>
  );
};

export default LeagueListItem;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.articleDivider};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 14px 20px;
  text-align: center;
  align-items: center;
  transition: transform 0.3s;

  background: #fff;
  cursor: pointer;

  &:hover {
    background: #ffcc80;
    transition: 0.3s ease-in-out;
    transform: translateY(-5px) scale(1.05);
  }

  @media (min-width: 480px) {
    flex-direction: column;
    width: 70px;
  }

  @media (min-width: 768px) {
    width: 64px;
    border: 1px solid ${({ theme }) => theme.colors.articleDivider};
    justify-content: left;
    border-radius: 8px;
    padding: 14px 10px;
  }
`;
const Title = styled.h3`
  font-size: 13px;
  color: #000;
  margin: 0px;

  &.long-name {
    font-size: 9px;
  }

  @media (min-width: 768px) {
    font-size: 12px;
    margin-bottom: 6px;

    &.long-name {
      font-size: 10px;
    }
  }
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subDiscription};

  svg {
    margin-right: 4px;
  }
`;
