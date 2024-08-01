"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/UI/SearchBar";
import LeagueBoardList from "@/components/league/board/LeagueBoardList";
import UserTab from "@/components/league/tab/UserTab";
import MoreBrandTab from "@/components/league/tab/MoreBrandTab";
import { useAuthStore } from "@/store/authStore";

import { LeagueBoardItem, UserLeague, LeagueList } from "@/types/league";

import { useLeagueStore } from "@/store/leagueStore";

// API
import dummy from "@/db/mainPageData.json";
import {
  fetchBrandLeagues,
  fetchBoardSearch,
  fetchLeagueBoardList,
  fetchUserLeagueList,
} from "@/api/league";

export default function LeaguePage({
  params,
}: {
  params: { leagueId: string };
}) {
  const router = useRouter();
  const leagueId = params.leagueId;

  const { isLoggedIn } = useAuthStore((state) => state);
  const {
    brandLeagueList,
    setBrandLeagueTab,
    userLeagueList,
    setUserLeagueList,
    mentionTabs,
    setMentionTabs,
    initialized,
    setInitialized,
    isLoadUserLeagues,
    setIsLoadUserLeagues,
    activeTabName,
    setActiveTabName,
  } = useLeagueStore();

  const [boardList, setBoardList] = useState<LeagueBoardItem[]>([]);

  // 정렬 기준
  const [criteria, setCriteria] = useState<string>("TIME");

  // 검색
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LeagueBoardItem[]>([]);

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        if (isLoggedIn && !isLoadUserLeagues) {
          const userLeagues: UserLeague[] = await fetchUserLeagueList();
          const userTabs: LeagueList[] = userLeagues.map((userLeague) => ({
            id: userLeague.league.id,
            name: userLeague.league.name,
            type: userLeague.league.type,
            peopleCount: userLeague.league.peopleCount,
          }));
          setUserLeagueList(userTabs);
          const userMentionTabs: LeagueList[] = userLeagues.map(
            (userLeague) => ({
              id: `mention${userLeague.league.id}`,
              name: userLeague.league.name,
              type: userLeague.league.type,
              peopleCount: userLeague.league.peopleCount,
            })
          );
          setMentionTabs(userMentionTabs);
          setIsLoadUserLeagues(true);
        }

        if (!initialized) {
          try {
            const leagues = await fetchBrandLeagues();
            setBrandLeagueTab(leagues);
            setInitialized(true);
          } catch (error) {
            console.log(error);
          }
        }
        // const leagues = await fetchBrandLeagues();
        // setMoreTabs(leagues);

        if (!leagueId.includes("mention")) {
          const boardData = await fetchLeagueBoardList(leagueId, criteria);
          setBoardList(boardData);
        }
      } catch (error) {
        console.error("Failed to fetch brand leagues or board data", error);
      }
    };

    loadLeagues();
  }, [
    leagueId,
    criteria,
    isLoggedIn,
    brandLeagueList,
    setBrandLeagueTab,
    initialized,
    setInitialized,
    setUserLeagueList,
    setMentionTabs,
    isLoadUserLeagues,
    setIsLoadUserLeagues,
  ]);

  useEffect(() => {
    let name = `${
      brandLeagueList.find((t) => t.id === leagueId)?.name ||
      userLeagueList.find((t) => t.id === leagueId)?.name
    } 리그`;
    if (name == `${undefined} 리그`) {
      name = `채널에서 ${
        userLeagueList.find((t) => t.id === leagueId.slice(7))?.name
      }가 멘션된 글`;
    }
    setActiveTabName(name);
  }, [brandLeagueList, userLeagueList, leagueId, setActiveTabName]);

  const handleCriteriaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCriteria(event.target.value);
  };

  const handleWriteClick = () => {
    router.push(`/league/${leagueId}/write`);
  };

  const isLeagueIdInTabs = userLeagueList.some((tab) => tab.id === leagueId);

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      return;
    }
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
        {isLoggedIn && userLeagueList.length > 0 ? (
          <UserTab
            activeTabId={leagueId}
            tabs={userLeagueList}
            mentionTabs={mentionTabs}
          />
        ) : (
          <div />
        )}
        <SearchBar onSearch={handleSearch} />
      </TopComponent>
      <MoreBrandTab
        activeTabId={leagueId}
        moreTabs={brandLeagueList}
        activeTabName={activeTabName}
      />
      <FilterSection>
        <StyledSelect value={criteria} onChange={handleCriteriaChange}>
          <option value="TIME">최신순</option>
          <option value="VIEW">조회수 순</option>
          <option value="COMMENT">댓글 순</option>
          <option value="LIKE">좋아요 순</option>
        </StyledSelect>
        {isLoggedIn && isLeagueIdInTabs && (
          <StyledButton className="setPosition" onClick={handleWriteClick}>
            글 작성 +
          </StyledButton>
        )}
      </FilterSection>
      {leagueId.includes("mention") ? (
        <h1>채널 게시글</h1>
      ) : isSearching ? (
        <LeagueBoardList leagueId={leagueId} boardList={searchResults} />
      ) : (
        <LeagueBoardList leagueId={leagueId} boardList={boardList} />
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
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  white-space: nowrap;

  &:hover {
    color: #f97316;
  }
`;

const noTab = styled.div`
  width: 100%;
`;
