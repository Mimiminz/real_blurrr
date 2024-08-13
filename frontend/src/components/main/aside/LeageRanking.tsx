import React from "react";
import styled from "styled-components";
import dummy from "@/db/mainPageData.json";
import LeagueRankingItem from "./LeageRankingItem";
import { LeagueList } from "@/types/leagueTypes";

interface LeagueRankingProps {
  leaugeRanking: LeagueList[];
}

const LeagueRanking: React.FC<LeagueRankingProps> = ({ leaugeRanking }) => {
  return (
    <RankingContainer>
      {LeagueRanking.length > 0 &&
        leaugeRanking.map((league, index) => (
          <LeagueRankingItem
            key={league.id}
            rank={index + 1}
            name={league.name}
            count={league.peopleCount}
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
