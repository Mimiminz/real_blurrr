"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/UI/SearchBar";
import LeagueBoardList from "@/components/league/board/LeagueBoardList";
import UserTab from "@/components/league/tab/UserTab";
import MoreBrandTab from "@/components/league/tab/MoreBrandTab";

import { LeagueList, Tab } from "@/types/league";

// API
import dummy from "@/db/mainPageData.json";
import { fetchBrandLeagues, fetchBoardSearch } from "@/api/league";

const tabs = dummy.leagueMembers.map((league) => ({
  id: league.id,
  name: league.name,
  type: league.type,
}));

const mentionTabs = dummy.leagueMembers.map((league) => ({
  id: `mention${league.id}`,
  name: league.name,
  type: league.type,
}));

export default function LeaguePage({
  params,
}: {
  params: { leagueId: string };
}) {
  const router = useRouter();
  const leagueId = params.leagueId;

  // 더보기 안에 있는 요소들
  const [moreTabs, setMoreTabs] = useState<Tab[]>([]);

  useEffect(() => {
    const loadBrandLeagues = async () => {
      try {
        const leagues: LeagueList[] = await fetchBrandLeagues();
        const formattedLeagues = leagues.map((league: LeagueList) => ({
          id: league.id,
          name: league.name,
          type: league.type,
        }));
        setMoreTabs(formattedLeagues);
      } catch (error) {
        console.error("Failed to fetch brand leagues", error);
      }
    };

    loadBrandLeagues();
  }, []);

  let activeTabName = `${
    moreTabs.find((t) => t.id === leagueId)?.name ||
    tabs.find((t) => t.id === leagueId)?.name
  } 리그`;

  if (activeTabName == `${undefined} 리그`) {
    activeTabName = `채널에서 ${
      tabs.find((t) => t.id === leagueId.slice(7))?.name
    }가 멘션된 글`;
  }

  // 정렬 기준
  const [criteria, setCriteria] = useState<string>("TIME");

  const handleCriteriaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCriteria(event.target.value);
  };

  // const handleWriteClick = () => {
  //   const selectedLeague = moreTabs.find(
  //     (league) => league.label === activeTabName
  //   );
  //   if (selectedLeague) {
  //     const leagueId = selectedLeague.id;
  //     router.push(
  //       `/league/${leagueId}/write?leagueName=${encodeURIComponent(
  //         activeTabName
  //       )}`
  //     );
  //   }
  // };

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (keyword: string) => {
    setIsSearching(true);
    try {
      const results = await fetchBoardSearch(leagueId, keyword);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <Container>
      <TopComponent>
        <UserTab activeTabId={leagueId} tabs={tabs} mentionTabs={mentionTabs} />
        <SearchBar onSearch={handleSearch} />
      </TopComponent>
      <MoreBrandTab
        activeTabId={leagueId}
        moreTabs={moreTabs}
        activeTabName={activeTabName}
      />
      <FilterSection>
        <StyledSelect value={criteria} onChange={handleCriteriaChange}>
          <option value="TIME">최신순</option>
          <option value="VIEW">조회수 순</option>
          <option value="COMMENT">댓글 순</option>
          <option value="LIKE">좋아요 순</option>
        </StyledSelect>
      </FilterSection>
      {leagueId.includes("mention") ? (
        <h1>채널 게시글</h1>
      ) : (
        <LeagueBoardList leagueId={leagueId} criteria={criteria} />
      )}
    </Container>
  );
}

const Container = styled.div``;

const TopComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const TabContent = styled.div`
  padding: 20px 0;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0;
  margin-bottom: 20px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const StyledSelect = styled.select`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-right: 10px;
  background-color: #fff;
  font-size: 14px;
  color: #333;
  outline: none;
`;

const StyledButton = styled.button`
  padding: 10px;
  background-color: #f1f1f1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  white-space: nowrap;

  &:hover {
    background-color: #ddd;
  }

  &:active {
    background-color: #ccc;
  }
`;
