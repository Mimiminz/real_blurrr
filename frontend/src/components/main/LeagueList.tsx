import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LeagueListItem from "./LeagueListItem";
import { useLeagueStore } from "@/store/leagueStore";

const LeagueList: React.FC = () => {
  const { brandLeagueList } = useLeagueStore();
  const [displayList, setDisplayList] = useState(brandLeagueList);

  useEffect(() => {
    // 새로고침 시 랜덤한 요소를 한 번만 선택
    const getRandomItems = (arr: typeof brandLeagueList, num: number) => {
      return arr
        .toSorted(() => 0.5 - Math.random()) // 배열을 랜덤하게 섞음
        .slice(0, num); // 원하는 수만큼 아이템을 선택
    };

    // 초기 랜덤 요소를 선택 (화면 너비와 무관하게 한 번만 수행)
    const randomItems = getRandomItems(brandLeagueList, 12);

    // 화면 너비에 따라 표시할 항목의 수를 조정
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setDisplayList(randomItems.slice(0, 5));
      } else {
        setDisplayList(randomItems.slice(0, 12));
      }
    };

    handleResize(); // 처음 로드될 때 크기 설정
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
  /* width: 100%; */
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
  margin: 18px;
`;
