"use client";

import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
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
    ? `${activeTabName.split("mention")[1]} 리그 멘션`
    : `${activeTabName} 리그`;

  const subtitle = activeTabName?.includes("mention")
    ? `채널에서 해당 리그가 멘션된 게시글`
    : activeTab.type === "MODEL"
    ? "해당 차량을 소유하지 않은 사용자는 게시글을 볼 수 없습니다"
    : "해당 브랜드의 차량을 소유하지 않은 사용자는 게시글을 볼 수 없습니다.";

  const handleToggleMoreTabs = () => {
    setShowMoreTabs(!showMoreTabs);
  };

  return (
    <>
      <TabContent>
        <HeaderContainer>
          <TitleContainer>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
          </TitleContainer>
          {activeTab.type === "BRAND" && (
            <MoreTabsButton onClick={handleToggleMoreTabs}>
              <span>더보기</span> {showMoreTabs ? "▲" : "▼"}
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
  margin: 30px 0;
`;

const MoreTabsButton = styled.button`
  border: none;
  padding: 10px 0 10px 10px;
  cursor: pointer;
  border-radius: 20px;
  color: #333;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;

  @media (max-width: 490px) {
    span {
      display: none;
    }
    font-size: 20px;
    padding-bottom: 20px;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
`;

const MoreTabsContainer = styled.div<{ $isOpen: boolean }>`
  overflow-y: auto;
  transition: max-height 0.3s ease, padding 0.3s ease;
  flex-wrap: wrap;
  border: ${(props) => (props.$isOpen ? "1px solid #ccc" : "none")};
  border-radius: 8px;
  margin-bottom: 20px;
  margin-left: auto;
  justify-content: center;
  align-items: center;
  max-height: ${(props) => (props.$isOpen ? "170px" : "0")};
  padding: ${(props) => (props.$isOpen ? "10px" : "0")};
  display: flex;
  animation: ${(props) => (props.$isOpen ? fadeIn : fadeOut)} 0.3s ease;
  ${(props) =>
    !props.$isOpen &&
    css`
      overflow: hidden;
    `}

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
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  min-width: 100px;
  text-align: center;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  color: ${(props) => (props.$isActive ? "#F97316" : "#333")};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f97316;
    color: white;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;

  @media (min-width: 480px) {
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin: 5px 0;
`;

const TitleContainer = styled.div``;

const Subtitle = styled.p`
  color: #999;
  font-size: 14px;
  margin: 0;
  margin-bottom: 14px;
`;
