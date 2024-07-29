"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import { League } from "@/types/league";
// API
import dummy from "@/db/mainPageData.json";
import { fetchBrandLeagues } from "@/api/league";

interface TabButtonProps {
  $isActive: boolean;
}

interface TabProps {
  activeTabId: string;
}

export default function MoreBrandTab({ activeTabId }: TabProps) {
  // 더보기 눌렀는지 여부 확인
  const [showMoreTabs, setShowMoreTabs] = useState(false);

  // 더보기 안에 있는 요소들
  const [moreTabs, setMoreTabs] = useState<
    { id: string; name: string; type: string }[]
  >([]);

  useEffect(() => {
    const loadBrandLeagues = async () => {
      try {
        const leagues: League[] = await fetchBrandLeagues();
        const formattedLeagues = leagues.map((league: League) => ({
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

  const handleToggleMoreTabs = () => {
    setShowMoreTabs(!showMoreTabs);
  };

  const activeTabType = moreTabs.find((t) => t.id === activeTabId)?.type;
  const activeTabName = moreTabs.find((t) => t.id === activeTabId)?.name;


  return (
    <>
      <TabContent>
        <HeaderContainer>
          <Title>{activeTabName} 리그</Title>
          {activeTabType === "BRAND" && (
            <MoreTabsButton onClick={handleToggleMoreTabs}>
              더보기 {showMoreTabs ? "▲" : "▼"}
            </MoreTabsButton>
          )}
        </HeaderContainer>
        <MoreTabsContainer $isOpen={showMoreTabs}>
          {moreTabs.map((tab) => (
            <MoreTabButton
              key={tab.id}
              href={`/league/${tab.id}`}
              $isActive={activeTabId === tab.id}
            >
              {tab.name}
            </MoreTabButton>
          ))}
        </MoreTabsContainer>
      </TabContent>
    </>
  );
}

const TabContent = styled.div`
  padding: 20px 0;
`;

const MoreTabsButton = styled.button`
  border: none;
  padding: 10px 0;
  cursor: pointer;
  border-radius: 20px;
  color: #333;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
`;

const MoreTabsContainer = styled.div.attrs<{ $isOpen: boolean }>((props) => ({
  style: {
    maxHeight: props.$isOpen ? "200px" : "0",
    padding: props.$isOpen ? "10px" : "0",
    display: props.$isOpen ? "flex" : "none",
  },
}))<{ $isOpen: boolean }>`
  overflow-y: auto;
  transition: max-height 0.3s ease, padding 0.3s ease;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: auto;
  justify-content: center;
  align-items: center;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: gray;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: #f0f0f0;
    border-radius: 10px;
  }
`;

const MoreTabButton = styled(Link)<TabButtonProps>`
  background: ${(props) => (props.$isActive ? "#FFEDD5" : "none")};
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 100px;
  text-align: center;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  color: ${(props) => (props.$isActive ? "#F97316" : "#333")};
  text-decoration: none;

  &:hover {
    background: #f97316;
    color: white;
  }
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

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0;
  margin-bottom: 20px;
`;
