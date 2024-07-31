"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";


import UserTab from "@/components/league/tab/UserTab";
import LeagueListItem from "@/components/league/LeagueListItem";
import { useAuthStore } from "@/store/authStore";

import { UserLeague, LeagueList } from "@/types/league";

import { useLeagueStore } from "@/store/leagueStore";

// API
import { fetchBrandLeagues, fetchUserLeagueList } from "@/api/league";

export default function LeagueMainPage() {
  const { isLoggedIn } = useAuthStore((state) => state);
  const { brandLeagueList, setBrandLeagueTab, initialized, setInitialized } =
    useLeagueStore();

  const [tabs, setTabs] = useState<LeagueList[]>([]);
  const [mentionTabs, setMentionTabs] = useState<LeagueList[]>([]);

  

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        if (isLoggedIn) {
          const userLeagues: UserLeague[] = await fetchUserLeagueList();
          const userTabs: LeagueList[] = userLeagues.map((userLeague) => ({
            id: userLeague.league.id,
            name: userLeague.league.name,
            type: userLeague.league.type,
            peopleCount: userLeague.league.peopleCount,
          }));
          setTabs(userTabs);
          const userMentionTabs: LeagueList[] = userLeagues.map(
            (userLeague) => ({
              id: `mention${userLeague.league.id}`,
              name: userLeague.league.name,
              type: userLeague.league.type,
              peopleCount: userLeague.league.peopleCount,
            })
          );
          setMentionTabs(userMentionTabs);
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
      } catch (error) {
        console.error("Failed to fetch brand leagues or board data", error);
      }
    };

    loadLeagues();
  }, [
    isLoggedIn,
    brandLeagueList,
    setBrandLeagueTab,
    initialized,
    setInitialized,
  ]);

  return (
    <>
      <TopComponent>
        {isLoggedIn && tabs.length > 0 ? (
          <UserTab activeTabId="" tabs={tabs} mentionTabs={mentionTabs} />
        ) : (
          <></>
        )}
      </TopComponent>
      <Title>브랜드 리그</Title>
      <Subtitle>
        해당 브랜드의 차량을 소유하지 않은 사용자는 게시글을 볼 수 없습니다.
      </Subtitle>
      <LeagueListContainer>
        {brandLeagueList.map((leagueList) => (
          <LeagueListItem
            key={leagueList.id}
            id={leagueList.id}
            name={leagueList.name}
            peopleCount={leagueList.peopleCount}
          />
        ))}
      </LeagueListContainer>
    </>
  );
}

const Container = styled.div``;

const TopComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const LeagueListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  justify-content: center;
  margin: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  padding: 20px 0 8px 0;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 14px;
  margin: 0;
`;
