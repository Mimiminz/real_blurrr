"use client";

import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import SearchBar from "@/components/common/UI/SearchBar";
import LeagueBoardList from "@/components/league/board/LeagueBoardList";
import UserTab from "@/components/league/tab/UserTab";
import MoreBrandTab from "@/components/league/tab/MoreBrandTab";
import LeagueMentionBoardList from "@/components/league/board/LeagueMentionList";
import PaginationComponent from "@/components/common/UI/Pagination";
import Loading from "@/components/common/UI/Loading";
import NoCarPopup from "@/components/league/NoCarPopup";
import NoAuthority from "@/components/league/NoAuthority";
import LoginForm from "@/components/login/LoginForm";

import {
  LeagueBoardItem,
  UserLeague,
  LeagueList,
  MentionChannelList,
  MentionChannelBoardList,
} from "@/types/leagueTypes";

import { useLeagueStore } from "@/store/leagueStore";
import { useAuthStore } from "@/store/authStore";

// API
import {
  fetchBrandLeagues,
  fetchBoardSearch,
  fetchLeagueBoardList,
  fetchUserLeagueList,
  fetchMentionBoardList,
} from "@/api/league";

export default function LeaguePage({
  params,
}: {
  params: { leagueName: string };
}) {
  const router = useRouter();
  const encodedLeagueName = params.leagueName;
  const leagueName = decodeURIComponent(encodedLeagueName);

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
    activeTab,
    setActiveTab,
  } = useLeagueStore();

  const [boardList, setBoardList] = useState<LeagueBoardItem[]>([]);
  const [mentionBoardList, setMentionBoardList] = useState<
    MentionChannelBoardList[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 팝업
  const [showNoCarPopup, setShowNoCarPopup] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showNoAuthority, setShowNoAuthority] = useState(false);

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTotalPages, setSearchTotalPages] = useState<number>(1);

  // 정렬 기준
  const [criteria, setCriteria] = useState<string>("TIME");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("게시글 정렬");

  // 검색
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LeagueBoardItem[]>([]);

  useEffect(() => {
    const loadLeagues = async () => {
      try {
        if (isLoggedIn && user?.isAuth && mentionTabs.length === 0) {
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
            console.log(error);
          }
        }
      } catch (error) {
        console.error("Failed to fetch brand leagues or board data", error);
      }
    };

    loadLeagues();
  }, [
    userLeagueList,
    user,
    mentionTabs,
    leagueName,
    criteria,
    isLoggedIn,
    brandLeagueList,
    setBrandLeagueTab,
    initialized,
    setInitialized,
    setUserLeagueList,
    setMentionTabs,
    isLoadUserLeagues,
    setIsLoadUserLeagues,
  ]);

  useEffect(() => {
    const loadBoardData = async () => {
      if (!initialized) {
        return;
      }
      const findActiveTab =
        brandLeagueList.find((t) => t.name === leagueName) ||
        userLeagueList.find((t) => t.name === leagueName);

      if (findActiveTab) {
        setActiveTab(findActiveTab);
        const boardData = await fetchLeagueBoardList(
          findActiveTab.id,
          criteria,
          findActiveTab.type,
          currentPage - 1
        );
        setBoardList(boardData.content);
        setTotalPages(boardData.totalPages);
        setLoading(false);
      } else {
        const findActiveTab = userLeagueList.find(
          (t) => t.name === leagueName.split("mention")[1]
        );
        if (findActiveTab) {
          const boardData = await fetchMentionBoardList(
            findActiveTab.id,
            criteria,
            currentPage - 1
          );
          setMentionBoardList(boardData.content);
          setTotalPages(boardData.totalPages);

          setLoading(false);
        } else {
          if (!isLoggedIn) {
            setShowLoginPopup(true);
          } else if (!user?.isAuth) {
            setShowNoCarPopup(true);
          } else {
            setShowNoAuthority(true);
          }
          setLoading(false);
          return;
        }
      }
    };

    loadBoardData();
  }, [
    brandLeagueList,
    userLeagueList,
    leagueName,
    criteria,
    setActiveTab,
    currentPage,
  ]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleWriteClick = () => {
    router.push(`/league/${leagueName}/write`);
  };

  const isLeagueIdInTabs = userLeagueList.some(
    (tab) => tab.name === leagueName
  );

  const onSortChange = (newSort: string) => {
    // 정렬 기준을 변경하고, API에서 사용할 수 있는 형식으로 변환
    const criteriaMap: { [key: string]: string } = {
      최신순: "TIME",
      댓글수: "COMMENT",
      조회수: "VIEW",
      좋아요: "LIKE",
    };

    const newCriteria = criteriaMap[newSort] || "TIME"; // 매핑되지 않는 경우 기본값 설정
    setCriteria(newCriteria);
  };

  const handleDropdownToggle = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleBlur = () => {
    setTimeout(() => setDropdownVisible(false), 200); // 드롭다운 메뉴가 닫히기 전에 클릭 이벤트가 발생하도록 시간을 둠
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
    setDropdownVisible(false);
    onSortChange(sort);
  };

  const handleSearch = async (keyword: string) => {
    if (!keyword.trim()) {
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    try {
      const results = await fetchBoardSearch(
        activeTab.id,
        keyword,
        currentPage - 1
      );
      setSearchResults(results.content);
      setSearchTotalPages(results.totalPages);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const closeNoCarPopup = () => {
    setShowNoCarPopup(false);
    setShowNoAuthority(false);
    router.back();
  };

  const closeLoginPopup = () => {
    setShowLoginPopup(false);
    router.back();
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <TopComponent>
        {isLoggedIn && userLeagueList.length > 0 ? (
          <UserTab
            activeTabName={leagueName}
            tabs={userLeagueList}
            mentionTabs={mentionTabs}
          />
        ) : (
          <div />
        )}
        <SearchBar onSearch={handleSearch} />
      </TopComponent>
      <MoreBrandTab
        activeTab={activeTab}
        moreTabs={brandLeagueList}
        activeTabName={leagueName}
      />
      <FilterSection>
        <DropdownButton onClick={handleDropdownToggle} onBlur={handleBlur}>
          {selectedSort}
          <span>▼</span>
        </DropdownButton>
        {isDropdownVisible && (
          <DropdownMenu>
            {["최신순", "댓글수", "조회수", "좋아요"].map((sort, index) => (
              <DropdownItem key={index} onClick={() => handleSortChange(sort)}>
                {sort}
              </DropdownItem>
            ))}
          </DropdownMenu>
        )}
        {isLoggedIn && isLeagueIdInTabs && (
          <StyledButton className="setPosition" onClick={handleWriteClick}>
            글 작성 +
          </StyledButton>
        )}
      </FilterSection>
      {leagueName.includes("mention") ? (
        <LeagueMentionBoardList boardList={mentionBoardList} />
      ) : isSearching ? (
        <LeagueBoardList leagueName={leagueName} boardList={searchResults} />
      ) : (
        <LeagueBoardList leagueName={leagueName} boardList={boardList} />
      )}
      {isSearching
        ? searchTotalPages > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={searchTotalPages}
              onPageChange={handlePageChange}
            />
          )
        : totalPages > 0 && (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

      {showNoCarPopup && <NoCarPopup closePopup={closeNoCarPopup} />}
      {showLoginPopup && (
        <ModalOverlay onClick={closeLoginPopup}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <LoginForm closeLoginModal={closeLoginPopup} />
            <CloseIcon onClick={closeLoginPopup}>×</CloseIcon>
          </ModalContent>
        </ModalOverlay>
      )}
      {showNoAuthority && <NoAuthority closePopup={closeNoCarPopup} />}
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

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0 20px 0;
  position: relative;

  .setPosition {
    display: flex;
    margin-left: auto;
  }
`;

const DropdownButton = styled.button`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  font-size: 14px;
  color: #969696;
  width: 110px;
  height: 37px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownMenu = styled.div`
  position: absolute;
  padding: 5px 0px;
  top: 45px;
  width: 110px;
  font-size: 14px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const DropdownItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background-color: #f1f1f1;
  }
`;

const StyledButton = styled.button`
  padding: 10px;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  color: #333;
  white-space: nowrap;

  &:hover {
    color: #f97316;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
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
    transform: translateY(-20px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 50%;
  width: 100%;
  animation: ${fadeIn} 300ms ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 300ms ease-in-out;
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #bbb;
  &:hover {
    color: #333;
  }
`;
