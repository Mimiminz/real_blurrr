import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LeagueListItem from "./LeagueListItem";
import { useLeagueStore } from "@/store/leagueStore";
import dummy from "@/db/mainPageData.json";

const LeagueList: React.FC = () => {
  const { brandLeagueList } = useLeagueStore();
  const [displayList, setDisplyList] = useState(brandLeagueList);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setDisplyList(brandLeagueList.slice(0, 5));
      } else if (window.innerWidth < 768) {
        setDisplyList(brandLeagueList.slice(0, 9));
      } else {
        setDisplyList(brandLeagueList.slice(0, 12));
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [brandLeagueList]);
  return (
    <ListContainer>
      {displayList.map((league) => (
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
