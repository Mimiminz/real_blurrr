import React from "react";
import styled from "styled-components";
import dummy from "@/db/mainPageData.json";
import LeagueRankingItem from "./LeageRankingItem";

const LeagueRanking: React.FC = () => {
  return (
    <RankingContainer>
      {dummy.rankings.map((item, index) => (
        <LeagueRankingItem
          key={index}
          rank={index + 1}
          name={item.name}
          count={item.count}
        />
      ))}
    </RankingContainer>
  );
};

export default LeagueRanking;

const RankingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
