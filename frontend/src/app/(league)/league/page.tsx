"use client";

import React, { useState } from "react";
import styled from "styled-components";
import { FaCar } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import dummy from "@/db/mainPageData.json";
import SearchBar from "@/components/common/UI/SearchBar";
import LeagueBoardList from "@/components/league/board/LeagueBoardList";

const tabs = [
  { id: "carModel", label: dummy.userInfo["carModel"], icon: <FaCar /> },
  {
    id: "carManufacture",
    label: dummy.userInfo["carManufacture"],
    icon: <MdFactory />,
  },
  {
    id: `at-${dummy.userInfo["carModel"]}`,
    label: `@ ${dummy.userInfo["carModel"]}`,
  },
  {
    id: `at-${dummy.userInfo["carManufacture"]}`,
    label: `@ ${dummy.userInfo["carManufacture"]}`,
  },
];

const moreTabs = dummy.LeagueList.map((league, index) => ({
  id: `more-${index}`,
  label: league.name,
}));

type TabId = string;

const LeaguePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("carModel");
  const [activeTabLabel, setActiveTabLabel] = useState<string>(
    dummy.userInfo["carModel"]
  );
  const [showMoreTabs, setShowMoreTabs] = useState(false);

  const handleToggleMoreTabs = () => {
    setShowMoreTabs(!showMoreTabs);
  };

  const handleTabClick = (id: TabId, label: string) => {
    setActiveTab(id);
    setActiveTabLabel(label);
    setShowMoreTabs(false);
  };

  const renderContent = (): JSX.Element => {
    return (
      <Title>
        {activeTabLabel.startsWith("@")
          ? `채널에서 ${activeTabLabel.slice(2)}가 멘션된 글`
          : `${activeTabLabel} 리그`}
      </Title>
    );
  };

  return (
    <Container>
      <TopComponent>
        <TabList>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              $isActive={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id, tab.label)}
            >
              {activeTab === tab.id && tab.icon}
              {tab.label}
            </TabButton>
          ))}
        </TabList>
        <SearchBar />
      </TopComponent>

      <TabContent>
        <HeaderContainer>
          <HeaderLeft>{renderContent()}</HeaderLeft>
          {activeTab === "carManufacture" && (
            <MoreTabsButton onClick={handleToggleMoreTabs}>
              더보기 {showMoreTabs ? "▲" : "▼"}
            </MoreTabsButton>
          )}
        </HeaderContainer>
        <MoreTabsContainer $isOpen={showMoreTabs}>
          {moreTabs.map((tab) => (
            <MoreTabButton
              key={tab.id}
              $isActive={activeTab === tab.id}
              onClick={() => handleTabClick(tab.id, tab.label)}
            >
              {tab.label}
            </MoreTabButton>
          ))}
        </MoreTabsContainer>
        <FilterSection>
          <StyledSelect className="sort-select">
            <option>게시물 정렬</option>
            <option>게시물 정렬</option>
            <option>게시물 정렬</option>
          </StyledSelect>
          <StyledButton className="setPosition">글 작성 +</StyledButton>
        </FilterSection>
        <LeagueBoardList />
      </TabContent>
    </Container>
  );
};

export default LeaguePage;

const Container = styled.div`
  margin: 0 220px;
`;

const TopComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-top: 30px;
`;

const TabList = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px;
  width: 120px;
  cursor: pointer;
  background: ${(props) => (props.$isActive ? "#FFEDD5" : "none")};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  color: ${(props) => (props.$isActive ? "#F97316" : "#333")};
  /* margin: 0 10px; */

  &:hover {
    color: #f97316;
  }

  svg {
    margin-right: 5px;
  }
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

  /* Custom Scrollbar Styles */
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

const MoreTabButton = styled.button<{ $isActive: boolean }>`
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

  &:hover {
    background: #f97316;
    color: white;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .sort-select {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    margin-right: 10px;
  }

  button {
    padding: 10px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    color: #333;
    white-space: nowrap;
  }
  /* 
  .setPosition {
    display: flex;
    margin-left: auto;
    margin-top: 20px;
  } */
`;

const StyledSelect = styled.select`
  padding: 10px;
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
