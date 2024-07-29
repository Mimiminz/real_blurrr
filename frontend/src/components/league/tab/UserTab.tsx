"use client";

import styled from "styled-components";
import Link from "next/link";

// API
import dummy from "@/db/mainPageData.json";
import { fetchBrandLeagues } from "@/api/league";

// 아이콘
import { FaCar } from "react-icons/fa";
import { MdFactory } from "react-icons/md";

const tabs = dummy.leagueMembers.map((league) => ({
  id: league.id,
  name: league.name,
  type: league.type,
  icon: league.type === "BRAND" ? <MdFactory /> : <FaCar />,
}));

const ta1bs = [
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

interface TabButtonProps {
  $isActive: boolean;
}

interface UserTabProps {
  activeTabId: string;
}

export default function UserTab({ activeTabId }: UserTabProps) {
  return (
    <>
      <TabList>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            href={`/league/${tab.id}`}
            $isActive={activeTabId === tab.id}
          >
            {activeTabId === tab.id && tab.icon}
            {tab.name}
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
