"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

import UserTab from "@/components/league/tab/UserTab";
import LeagueListItem from "@/components/league/LeagueListItem";
import { useAuthStore } from "@/store/authStore";

import { LeagueList } from "@/types/leagueTypes";

import { useLeagueStore } from "@/store/leagueStore";
import Loading from "@/components/common/UI/Loading";

// API
import { fetchBrandLeagues, fetchUserLeagueList } from "@/api/league";

export default function LeagueMainPage() {
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
  } = useLeagueStore();

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        if (
          isLoggedIn &&
          user?.isAuth &&
          mentionTabs.length === 0 &&
          userLeagueList
        ) {
          const userMentionTabs: LeagueList[] = userLeagueList.map(
            (league) => ({
              id: `mention${league.id}`,
              name: league.name,
              type: league.type,
              peopleCount: league.peopleCount,
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
            throw error;
          }
        }
      } catch (error) {
        console.error("Failed to fetch brand leagues or board data", error);
      }
    };

    loadLeagues();
  }, [
    user,
    isLoggedIn,
    brandLeagueList,
    userLeagueList,
    setBrandLeagueTab,
    initialized,
    setInitialized,
    setUserLeagueList,
    setMentionTabs,
    isLoadUserLeagues,
    setIsLoadUserLeagues,
  ]);

  const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 상태 추가

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 클라이언트에 마운트되었음을 표시
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <>
      <TopComponent>
        {isLoggedIn && userLeagueList.length > 0 ? (
          <UserTab
            activeTabName=""
            tabs={userLeagueList}
            mentionTabs={mentionTabs}
          />
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
  margin-top: 40px;
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
