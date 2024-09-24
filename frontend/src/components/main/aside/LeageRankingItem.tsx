import React from "react";
import styled from "styled-components";
import { MdPeopleAlt } from "react-icons/md";

interface LeagueRankingItemProps {
  rank: number;
  name: string;
  count: number;
}

const LeagueRankingItem: React.FC<LeagueRankingItemProps> = ({
  rank,
  name,
  count,
}) => {
  return (
    <ItemContainer>
      <Rank>{rank}</Rank>
      <Name>{name}</Name>
      <CountContainer>
        <Icon>
          <MdPeopleAlt />
        </Icon>
        <Count>{count}</Count>
      </CountContainer>
    </ItemContainer>
  );
};

export default LeagueRankingItem;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`;

const Rank = styled.div`
  width: 20px;
  font-weight: bold;
  font-size: 13px;
`;

const Name = styled.div`
  flex: 1;
  font-size: 13px;
  font-weight: bold;
`;

const CountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  vertical-align: middle;
`;

const Count = styled.span`
  font-size: 12px;
`;
