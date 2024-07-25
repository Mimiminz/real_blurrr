import React from "react";
import styled from "styled-components";
import LeagueListItem from "./LeagueListItem";
import dummy from "@/db/mainPageData.json";

const LeagueList: React.FC = () => {
  return (
    <ListContainer>
      {dummy.LeagueList.slice(0, 16).map((league, index) => (
        <LeagueListItem key={index} name={league.name} count={league.count} />
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
