import React from "react";
import styled from "styled-components";
interface LeagueListItemProps {
  name: string;
  count: number;
}

const LeagueListItem: React.FC<LeagueListItemProps> = ({ name, count }) => {
  return (
    <CardContainer>
      <Title>{name}</Title>
      <CountContainer>
        <Icon>👤</Icon>
        <Count>{count}</Count>
      </CountContainer>
    </CardContainer>
  );
};

export default LeagueListItem;

const CardContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.articleDivider};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  font-size: 14px;
  color: #000;
  margin-bottom: 8px;
  margin-top: 0px;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.subDiscription};
`;

const Icon = styled.span`
  font-size: 14px;
  margin-right: 4px;
`;

const Count = styled.span`
  font-size: 14px;
  color: #000;
`;
