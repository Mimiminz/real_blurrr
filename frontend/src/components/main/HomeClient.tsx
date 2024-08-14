// src/components/main/HomeClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import HotArticleList from "@/components/main/HotArticleList";
import BlackboxList from "@/components/main/BlackboxList";
import CarPictureList from "@/components/main/CarPictureList";
import LeagueList from "@/components/main/LeagueList";
import TopCarCard from "@/components/main/aside/TopCarCard";

import { IoArrowForward } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { FaCrown } from "react-icons/fa6";
import { PiRanking } from "react-icons/pi";

import LeagueRanking from "@/components/main/aside/LeageRanking";
import UserCarInfo from "@/components/main/user/UserCarInfo";
import FollowChannelInfo from "@/components/main/user/FollowChannelInfo";

import { useLeagueStore } from "@/store/leagueStore";
import { useAuthStore } from "@/store/authStore";
import { fetchBrandLeagues, fetchUserLeagueList } from "@/api/league";
import {
  fetchDashCams,
  fetchHotArticles,
  fetchLeagueRanking,
  fetchMyCars,
  fetchTodayCar,
} from "@/api/mainPage";
import { fetchFollowingChannels } from "@/api/channel";
import { Channels } from "@/types/channelType";
import { UserLeague, LeagueList as LeagueListType } from "@/types/leagueTypes";
import {
  DashCamItem,
  HotBoardItem,
  TodayCarItem,
  MyCarItem,
} from "@/types/mainPageTypes";
import Loading from "@/components/common/UI/Loading";
import * as S from "@/styles/homePage.styled"; // 분리된 스타일 불러오기

export default function HomeClient() {
  const router = useRouter();
  const { userLeagueList, setBrandLeagueTab } = useLeagueStore();
  const { isLoggedIn, user } = useAuthStore();

  const [isBoardLoading, setIsBoardLoading] = useState(true);
  const [isLeagueLoading, setIsLeagueLoading] = useState(true);
  const [hotBoards, setHotBoards] = useState<HotBoardItem[]>([]);
  const [dashcamBoards, setDashcamBoards] = useState<DashCamItem[]>([]);
  const [todayCar, setTodayCar] = useState<TodayCarItem | null>(null);
  const [myCarBoards, setMyCarBoards] = useState<MyCarItem[]>([]);
  const [followChannels, setFollowChannels] = useState<Channels[]>([]);
  const [leaugeRanking, setLeagueRanking] = useState<LeagueListType[]>([]);

  useEffect(() => {
    const fetchMainProps = async () => {
      try {
        const hot = await fetchHotArticles();
        setHotBoards(hot);

        const dashcam = await fetchDashCams();
        setDashcamBoards(dashcam);

        const today = await fetchTodayCar();
        setTodayCar(today);

        const car = await fetchMyCars();
        setMyCarBoards(car);

        const ranking = await fetchLeagueRanking();
        setLeagueRanking(ranking);

        if (isLoggedIn) {
          const follow = await fetchFollowingChannels();
          setFollowChannels(follow);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsBoardLoading(false);
      }
    };

    fetchMainProps();
    setIsBoardLoading(false);
  }, [isLoggedIn]);

  useEffect(() => {
    const initailizeTabs = async () => {
      try {
        const leagues = await fetchBrandLeagues();
        setBrandLeagueTab(leagues);
      } catch (error) {
        console.log(error);
      }
    };

    initailizeTabs();
    setIsLeagueLoading(false);
  }, []);

  const handleMoreClickLeage = () => {
    router.push("/league");
  };
  const handleMoreClickDashcam = () => {
    router.push("/channels/dashcam");
  };

  const handleMoreClickBoast = () => {
    router.push("/channels/boast");
  };

  const handleCarCertification = () => {
    router.push("/carcertification");
  };

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <S.PageContainer>
      <S.Main>
        {isLoggedIn !== false && (
          <S.UserInfoContainer>
            <UserCarInfo />
            <FollowChannelInfo followChannels={followChannels} />
          </S.UserInfoContainer>
        )}
        <S.ArticleSection>
          <S.SectionTitle>
            <BsFire />
            Hot
          </S.SectionTitle>
          <HotArticleList hotBoards={hotBoards} />
        </S.ArticleSection>
        <S.ArticleSection>
          <S.SectionHeader>
            <S.SectionTitle>브랜드 리그</S.SectionTitle>
            <S.MoreButton onClick={handleMoreClickLeage}>
              더보기
              <IoArrowForward />
            </S.MoreButton>
          </S.SectionHeader>
          <LeagueList />
        </S.ArticleSection>
        <S.ArticleSection>
          <S.SectionHeader>
            <S.SectionTitle>블랙박스</S.SectionTitle>
            <S.MoreButton onClick={handleMoreClickDashcam}>
              더보기
              <IoArrowForward />
            </S.MoreButton>
          </S.SectionHeader>
          <BlackboxList dashcamBoards={dashcamBoards} />
        </S.ArticleSection>
        <S.ArticleSection>
               <S.SectionHeader>
                  <S.SectionTitle>차 자랑</S.SectionTitle>
                  <S.MoreButton onClick={handleMoreClickBoast}>
                     더보기
                     <IoArrowForward />
                  </S.MoreButton>
               </S.SectionHeader>
               <CarPictureList myCarBoards={myCarBoards} />
            </S.ArticleSection>
      </S.Main>
      <S.Aside>
        <S.AsideSection>
          <S.AsideSectionTitle className="today">
            <FaCrown />
            오늘의 차
          </S.AsideSectionTitle>
          <TopCarCard todayCar={todayCar} />
        </S.AsideSection>
        <S.AsideSection>
          <S.AsideSectionTitle>
            <PiRanking />
            주간 리그 순위
          </S.AsideSectionTitle>
          <LeagueRanking leaugeRanking={leaugeRanking} />
        </S.AsideSection>
      </S.Aside>
    </S.PageContainer>
  );
}
