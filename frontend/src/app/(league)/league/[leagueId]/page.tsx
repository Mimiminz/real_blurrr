"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/UI/SearchBar";
import LeagueBoardList from "@/components/league/board/LeagueBoardList";
import UserTab from "@/components/league/tab/UserTab";

// API
import dummy from "@/db/mainPageData.json";
import { fetchBrandLeagues } from "@/api/league";
import MoreBrandTab from "@/components/league/tab/MoreBrandTab";

export default function LeaguePage({
  params,
}: {
  params: { leagueId: string };
}) {
  const router = useRouter();
  const leagueId = params.leagueId;

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

  // const activeTabType =
  //   tabs.find((t) => t.id === activeTab)?.type ||
  //   moreTabs.find((t) => t.id === activeTab)?.type;

  // const renderContent = (): JSX.Element => {
  //   return (
  //     <Title>
  //       {activeTabName.startsWith("@")
  //         ? `채널에서 ${activeTabName.slice(2)}가 멘션된 글`
  //         : `${activeTabName} 리그`}
  //     </Title>
  //   );
  // };

  return (
    <Container>
      <TopComponent>
        <UserTab activeTabId={leagueId} />
        <SearchBar />
      </TopComponent>
      <MoreBrandTab activeTabId={leagueId} />
      <FilterSection>
      <StyledSelect value={criteria} onChange={handleCriteriaChange}>
            <option value="TIME">최신순</option>
            <option value="VIEW">조회수 순</option>
            <option value="COMMENT">댓글 순</option>
            <option value="LIKE">좋아요 순</option>
          </StyledSelect>
      </FilterSection>
      <LeagueBoardList leagueId={leagueId} criteria={criteria} />
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
