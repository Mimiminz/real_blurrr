"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/UI/SearchBar";
import LeagueBoardList from "@/components/league/board/LeagueBoardList";
import UserTab from "@/components/league/tab/UserTab";
import MoreBrandTab from "@/components/league/tab/MoreBrandTab";

import { LeagueBoardItem, UserLeague, LeagueList } from "@/types/leagueTypes";

import { useLeagueStore } from "@/store/leagueStore";
import { useAuthStore } from "@/store/authStore";

// API
import {
  fetchBrandLeagues,
  fetchBoardSearch,
  fetchLeagueBoardList,
  fetchUserLeagueList,
  fetchMentionBoardList
} from "@/api/league";

export default function LeaguePage({
  params,
}: {
  params: { leagueName: string };
}) {
  const router = useRouter();
  const encodedLeagueName = params.leagueName;
  const leagueName = decodeURIComponent(encodedLeagueName);

  const { isLoggedIn, user } = useAuthStore((state) => state);
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
    activeTab,
    setActiveTab,
  } = useLeagueStore();

  const [boardList, setBoardList] = useState<LeagueBoardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 정렬 기준
  const [criteria, setCriteria] = useState<string>("TIME");

  // 검색
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LeagueBoardItem[]>([]);

  // useEffect(() => {
  //   const hasAccess = userLeagueList.some((league) => league.id === leagueId);
  //   if (!hasAccess) {
  //     alert("허용되지 않은 리그입니다.");
  //     router.back();
  //   }
  // }, []);

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        if (isLoggedIn && !isLoadUserLeagues) {
          if (user?.isAuth) {
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
          } else {
            const userTabs: LeagueList[] = [];
            setUserLeagueList(userTabs);
            const userMentionTabs: LeagueList[] = [];
            setMentionTabs(userMentionTabs);
          }
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
      } catch (error) {
        console.error("Failed to fetch brand leagues or board data", error);
      }
    };

    loadLeagues();
  }, [
    leagueName,
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
    const loadBoardData = async () => {
      const findActiveTab =
        brandLeagueList.find((t) => t.name === leagueName) ||
        userLeagueList.find((t) => t.name === leagueName);

      if (findActiveTab) {
        setActiveTab(findActiveTab);
        const boardData = await fetchLeagueBoardList(
          findActiveTab.id,
          criteria,
          findActiveTab.type
        );
        setBoardList(boardData);
        setLoading(false);
      } else {
        const findActiveTab = userLeagueList.find((t) => t.name === leagueName.split('mention')[1])
        if (findActiveTab) {
          const boardData = await fetchMentionBoardList(
          findActiveTab.id,
          criteria,
        )
        setBoardList(boardData);
        setLoading(false);}
      }
    };

    loadBoardData();
  }, [brandLeagueList, userLeagueList, leagueName, criteria, setActiveTab]);

  const handleCriteriaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCriteria(event.target.value);
  };

  const handleWriteClick = () => {
    router.push(`/league/${leagueName}/write`);
  };

  const isLeagueIdInTabs = userLeagueList.some(
    (tab) => tab.name === leagueName
  );

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const results = await fetchBoardSearch(activeTab.id, keyword);
      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <TopComponent>
        {isLoggedIn && userLeagueList.length > 0 ? (
          <UserTab
            activeTabName={leagueName}
            tabs={userLeagueList}
            mentionTabs={mentionTabs}
          />
        ) : (
          <div />
        )}
        <SearchBar onSearch={handleSearch} />
      </TopComponent>
      <MoreBrandTab
        activeTab={activeTab}
        moreTabs={brandLeagueList}
        activeTabName={leagueName}
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
      {leagueName.includes("mention") ? (
        <LeagueBoardList leagueName={leagueName.split('mention')[1]} boardList={boardList} />
      ) : isSearching ? (
        <LeagueBoardList leagueName={leagueName} boardList={searchResults} />
      ) : (
        <LeagueBoardList leagueName={leagueName} boardList={boardList} />
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
