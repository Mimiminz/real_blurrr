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

export default function Home() {
  const router = useRouter();
  const handleMoreClickLeage = () => {
    router.push("/league");
  };
  const handleMoreClickDashcam = () => {
    router.push("/channels/dashcam");
  };

  const handleMoreClickBoast = () => {
    router.push("/channels/boast");
  };
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
            <HotArticleList />
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

const UserInfoContainer = styled.div`
  margin: 20px;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  color: gray;
  cursor: pointer;
  font-size: 14px;
  margin-top: 40px;
  /* text-decoration: underline; */
`;

const MoreButtonIcon = styled.span`
  margin-left: 4px;
  align-items: center;
  justify-content: center;
  font-size: 14px; /* 아이콘 크기 조정 */
  vertical-align: middle;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 20%;

  @media (max-width: 992px) {
    margin: 0 20px;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 30px;
  width: 100%;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Main = styled.main`
  grid-column: span 8;
  padding: 10px;

  @media (max-width: 992px) {
    grid-column: span 12;
  }
`;

const Aside = styled.aside`
  grid-column: span 4;

  @media (max-width: 992px) {
    display: none;
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
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Icon = styled.span`
  margin-right: 4px;
`;
