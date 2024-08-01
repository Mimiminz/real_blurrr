"use client";
import { useRouter } from "next/navigation";

import styled from "styled-components";
import HotArticleList from "@/components/main/HotArticleList";
import BlackboxList from "@/components/main/BlackboxList";
import CarPictureList from "@/components/main/CarPictureList";

import LeagueList from "@/components/main/LeagueList";
import TopCarCard from "@/components/main/aside/TopCarCard";
``;
import { LuTrophy } from "react-icons/lu";
import { IoArrowForward } from "react-icons/io5";
import LeagueRanking from "@/components/main/aside/LeageRanking";
import UserCarInfo from "@/components/main/user/UserCarInfo";
import FollowChannelInfo from "@/components/main/user/FollowChannelInfo";

import { useLeagueStore } from "@/store/leagueStore";
import { useEffect, useState } from "react";
import { fetchBrandLeagues } from "@/api/league";
import { fetchHotArticles } from "@/api/mainPage";
import { HotBoardItem } from "@/types/mainPageTypes";

export default function Home() {
  const router = useRouter();
  const { brandLeagueList, setBrandLeagueTab, initialized, setInitialized } =
    useLeagueStore();

  const [hotBoards, setHotBoards] = useState<HotBoardItem[]>([]);

  useEffect(() => {
    const fetchMainProps = async () => {
      try {
        const hot = await fetchHotArticles();
        setHotBoards(hot);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMainProps();
  }, []);

  useEffect(() => {
    const initailizeTabs = async () => {
      if (!initialized) {
        try {
          const leagues = await fetchBrandLeagues();
          setBrandLeagueTab(leagues);
          setInitialized(true);
        } catch (error) {
          console.log(error);
        }
      }
    };

    initailizeTabs();
  }, [initialized, setBrandLeagueTab, setInitialized]);
  const handleMoreClickLeage = () => {
    router.push("/league");
  };
  const handleMoreClickDashcam = () => {
    router.push("/channels/dashcam");
  };

  const handleMoreClickBoast = () => {
    router.push("/channels/boast");
  };

  if (!hotBoards) {
    return <div>loading...</div>;
  }

  return (
    <PageContainer>
      <GridContainer>
        <Main>
          <UserInfoContainer>
            <UserCarInfo />
            <FollowChannelInfo />
          </UserInfoContainer>
          <ArticleSection>
            <SectionTitle>Hot</SectionTitle>
            <HotArticleList hotBoards={hotBoards} />
          </ArticleSection>
          <ArticleSection>
            <SectionHeader>
              <SectionTitle>브랜드 리그</SectionTitle>
              <MoreButton onClick={handleMoreClickLeage}>
                더보기
                <MoreButtonIcon>
                  <IoArrowForward />
                </MoreButtonIcon>
              </MoreButton>
            </SectionHeader>
            <LeagueList />
          </ArticleSection>
          <ArticleSection>
            <SectionHeader>
              <SectionTitle>블랙박스</SectionTitle>
              <MoreButton onClick={handleMoreClickDashcam}>
                더보기
                <MoreButtonIcon>
                  <IoArrowForward />
                </MoreButtonIcon>
              </MoreButton>
            </SectionHeader>
            <BlackboxList />
          </ArticleSection>
          <ArticleSection>
            <SectionHeader>
              <SectionTitle>차 자랑</SectionTitle>
              <MoreButton onClick={handleMoreClickBoast}>
                더보기
                <MoreButtonIcon>
                  <IoArrowForward />
                </MoreButtonIcon>
              </MoreButton>
            </SectionHeader>
            <CarPictureList />
          </ArticleSection>
        </Main>
        <Aside>
          <AsideSection>
            <AsideSectionTitle>
              <Icon>
                <LuTrophy />
              </Icon>
              오늘의 차
            </AsideSectionTitle>
            <TopCarCard />
          </AsideSection>
          <AsideSection>
            <AsideSectionTitle>주간 리그 순위</AsideSectionTitle>
            <LeagueRanking />
          </AsideSection>
        </Aside>
      </GridContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
    gap: 40px;
    width: 100%;
  }
`;

const Main = styled.main`
  grid-column: span 12;
  padding: 10px;

  @media (min-width: 1024px) {
    grid-column: span 9;
  }
`;

const Aside = styled.aside`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    grid-column: span 3;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  margin-bottom: 0;
`;

const ArticleSection = styled.div`
  margin: 20px;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AsideSection = styled.div`
  padding: 20px;
  padding-top: 10px;
  margin-top: 40px;

  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  align-items: center;
`;

const AsideSectionTitle = styled.h2`
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  margin-right: 4px;
`;

const UserInfoContainer = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 14px;
  margin-top: 40px;
`;

const MoreButtonIcon = styled.span`
  margin-left: 4px;
  align-items: center;
  justify-content: center;
  font-size: 14px; /* 아이콘 크기 조정 */
  vertical-align: middle;
`;
