"use client";

import styled from "styled-components";
import Link from "next/link";

import { UserTabProps, TabButtonProps } from "@/types/leagueTypes";

// 아이콘
import { FaCar } from "react-icons/fa";
import { MdFactory } from "react-icons/md";

export default function UserTab({
  activeTabId,
  tabs,
  mentionTabs,
}: UserTabProps) {
  return (
    <>
      <TabList>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            href={`/league/${tab.id}`}
            $isActive={activeTabId === tab.id}
          >
            {activeTabId === tab.id &&
              (tab.type === "BRAND" ? <MdFactory /> : <FaCar />)}
            {tab.name}
          </TabButton>
        ))}
        {mentionTabs.map((tab) => (
          <TabButton
            key={tab.id}
            href={`/league/${tab.id}`}
            $isActive={activeTabId === tab.id}
          >
            @{tab.name}
          </TabButton>
        ))}
      </TabList>
    </>
  );
}

const TabList = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`;

const TabButton = styled(Link)<TabButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
  min-width: 100px;
  cursor: pointer;
  background: ${(props) => (props.$isActive ? "#FFEDD5" : "none")};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
  color: ${(props) => (props.$isActive ? "#F97316" : "#333")};
  text-decoration: none;

  &:hover {
    color: #f97316;
  }

  svg {
    margin-right: 5px;
  }
`;
