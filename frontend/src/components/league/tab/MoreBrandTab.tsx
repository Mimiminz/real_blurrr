"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

import { moreTabProps, TabButtonProps } from "@/types/leagueTypes";

export default function MoreBrandTab({
  activeTab,
  moreTabs,
  activeTabName,
}: moreTabProps) {
  // 더보기 눌렀는지 여부 확인
  const [showMoreTabs, setShowMoreTabs] = useState(false);

  const title = activeTabName?.includes("mention")
    ? `채널에서 ${activeTabName.split("mention")[1]} 리그가 멘션된 글`
    : `${activeTabName} 리그`;

  const handleToggleMoreTabs = () => {
    setShowMoreTabs(!showMoreTabs);
  };

  return (
    <>
      <TabContent>
        <HeaderContainer>
          <TitleContainer>
            <Title>{title}</Title>
            <Subtitle>
              해당 브랜드의 차량을 소유하지 않은 사용자는 게시글을 볼 수
              없습니다.
            </Subtitle>
          </TitleContainer>
          {activeTab.type === "BRAND" && (
            <MoreTabsButton onClick={handleToggleMoreTabs}>
              더보기 {showMoreTabs ? "▲" : "▼"}
            </MoreTabsButton>
          )}
        </HeaderContainer>
        <MoreTabsContainer $isOpen={showMoreTabs}>
          {moreTabs.map((tab) => (
            <MoreTabButton
              key={tab.id}
              href={`/league/${tab.name}`}
              $isActive={activeTab.id === tab.id}
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
    maxHeight: props.$isOpen ? "170px" : "0",
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
`;

const TitleContainer = styled.div``;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 14px;
  margin: 0;
  margin-bottom: 20px;
`;
