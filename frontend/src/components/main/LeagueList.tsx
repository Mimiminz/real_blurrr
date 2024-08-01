import React from "react";
import styled from "styled-components";
import LeagueListItem from "./LeagueListItem";
import { useLeagueStore } from "@/store/leagueStore";
import dummy from "@/db/mainPageData.json";

const LeagueList: React.FC = () => {
  const { brandLeagueList } = useLeagueStore();
  return (
    <ListContainer>
      {brandLeagueList.slice(0, 12).map((league) => (
        <LeagueListItem
          key={league.id}
          id={league.id}
          name={league.name}
          peopleCount={league.peopleCount}
        />
      ))}
    </ListContainer>
  );
};

export default LeagueList;

const ListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
  margin: 18px;
`;
