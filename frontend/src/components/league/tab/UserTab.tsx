"use client";

import styled from "styled-components";
import Link from "next/link";

import { UserTabProps, TabButtonProps } from "@/types/leagueTypes";

// 아이콘
import { FaCar } from "react-icons/fa";
import { MdFactory } from "react-icons/md";

export default function UserTab({
  activeTabName,
  tabs,
  mentionTabs,
}: UserTabProps) {
  return (
    <>
      <TabList>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            href={`/league/${tab.name}`}
            $isactive={activeTabName === tab.name}
          >
            {activeTabName === tab.name &&
              (tab.type === "BRAND" ? <MdFactory /> : <FaCar />)}
            {tab.name}
          </TabButton>
        ))}
        {mentionTabs.map((tab) => (
          <TabButton
            key={tab.id}
            href={`/league/mention${tab.name}`}
            $isactive={activeTabName === `mention${tab.name}`}
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
  gap: 5px;

  @media (min-width: 480px) {
    flex-direction: row;
    gap: 10px;
  }
`;

const TabButton = styled(Link)<TabButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 5px;
  min-width: 55px;
  max-height: 30px;
  cursor: pointer;
  background: ${(props) => (props.$isactive ? "#FFEDD5" : "none")};
  border: none;
  border-radius: 15px;
  font-size: 12px;
  font-weight: ${(props) => (props.$isactive ? "bold" : "normal")};
  color: ${(props) => (props.$isactive ? "#F97316" : "#333")};
  text-decoration: none;

  &:hover {
    color: #f97316;
  }

  svg {
    margin-right: 5px;
  }

  @media (min-width: 425px) {
    padding: 10px 5px;
    min-width: 80px;
    max-height: 40px;
    font-size: 14px;
    border-radius: 20px;
  }
`;
