"use client";

import styled from "styled-components";
import HotArticleList from "@/components/main/HotArticleList";
import BlackboxList from "@/components/main/BlackboxList";
import CarPictureList from "@/components/main/CarPictureList";

import LeagueList from "@/components/main/LeageList";
import TopCarCard from "@/components/main/aside/TopCarCard";

import { LuTrophy } from "react-icons/lu";

export default function Home() {
  return (
    <PageContainer>
      <GridContainer>
        <Main>
          <ArticleSection>
            <SectionTitle>Hot</SectionTitle>
            <HotArticleList />
          </ArticleSection>
          <ArticleSection>
            <SectionTitle>브랜드 리그</SectionTitle>
            <LeagueList />
          </ArticleSection>
          <ArticleSection>
            <SectionTitle>블랙박스</SectionTitle>
            <BlackboxList />
          </ArticleSection>
          <ArticleSection>
            <SectionTitle>차 자랑</SectionTitle>
            <CarPictureList />
          </ArticleSection>
        </Main>
        <Aside>
          <AsideSection>
            <AsideSectionTitle>
              <LuTrophy />
              오늘의 차
            </AsideSectionTitle>
            <TopCarCard />
          </AsideSection>
        </Aside>
      </GridContainer>
    </PageContainer>
  );
}

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
  margin-top: 40px;

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

const AsideSection = styled.div`
  padding: 10px;
  padding-bottom: 20px;
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
