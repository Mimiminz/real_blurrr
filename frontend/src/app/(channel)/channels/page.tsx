"use client"

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChannelCard from '@/components/channel/list/ChannelCard';
import ChannelCarousel from '@/components/channel/list/ChannelCarousel'; 
import SearchBar from '@/components/common/UI/SearchBar'; 
import { useRouter } from 'next/navigation';
import { fetchChannels, fetchFollowingChannels, fetchCreatedChannels, fetchSearchKeywords } from '@/api/channel';
import { Channels } from '@/types/channelType';
import { useAuthStore } from '@/store/authStore';
import Loading from "@/components/common/UI/Loading";

const ChannelPage: React.FC = () => {
  const [Channels, setChannels] = useState<Channels[]>([]);
  const [FollowingChannels, setFollowingChannels] = useState<Channels[]>([]);
  const [CreatedChannels, setCreatedChannels] = useState<Channels[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [first, setFirst] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const dashcamId = process.env.NEXT_PUBLIC_DASHCAM_ID;
  const boastId = process.env.NEXT_PUBLIC_BOAST_ID;

  useEffect(() => {
    const accessToken = useAuthStore.getState().accessToken;
    setIsLoggedIn(!!accessToken);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); // 로딩 시작
      try {
        const ChannelData = await fetchChannels();
        if (ChannelData) {
          setChannels(ChannelData.content);
          setCurrentPage(ChannelData.currentPage);
          setFirst(ChannelData.first);
          setHasNext(ChannelData.hasNext);
        } else {
          setChannels([]); // 204 상태일 때 빈 배열 설정
        }

        if (isLoggedIn) {
          const FollowingChannelData = await fetchFollowingChannels();
          const CreatedChannelData = await fetchCreatedChannels();
          setFollowingChannels(FollowingChannelData);
          setCreatedChannels(CreatedChannelData);
        }
      } catch (error) {
        console.error('Failed to fetch channels data:', error);
      } finally {
        setIsLoading(false); // 로딩 끝
      }
    };
    loadData();
  }, [isLoggedIn]);

  const handleCreateChannel = () => {
    router.push(`/channels/11ef4fda-4b03-5943-acdf-3f973caa821e`);
  };

  const handleChannelClick = (channelId: string) => {
    if (channelId === dashcamId) {
      router.push('/channels/dashcam');
    } else if (channelId === boastId) {
      router.push('/channels/boast');
    } else {
      router.push(`/channels/${channelId}`);
    }
  };


  const onSearch = async (newKeyword: string) => {
    try {
      if (!newKeyword.trim()) {
        const ChannelData = await fetchChannels();
        setChannels(ChannelData ? ChannelData.content : []);
      } else {
        const searchResults = await fetchSearchKeywords(newKeyword, 0);
        setChannels(searchResults);
      }
    } catch (error) {
      console.error('Error fetching channels data:', error);
    }
  };

  // <ButtonContainer>
  //   <CreateButton onClick={handleCreateChannel}>채널 생성 +</CreateButton>
  // </ButtonContainer>
  return (
    <>
      {isLoggedIn && (
        <>

          <SectionTitle>내가 생성한 채널</SectionTitle>
          {CreatedChannels.length === 0 ? (
            <p>생성한 채널이 없습니다</p>
          ) : (
            <ChannelCarousel slides={CreatedChannels} handleChannelClick={handleChannelClick} />
          )}

          <SectionTitle>내가 팔로우한 채널</SectionTitle>
          {FollowingChannels.length === 0 ? (
            <p>팔로잉한 채널이 없습니다</p>
          ) : (
            <ChannelCarousel slides={FollowingChannels} handleChannelClick={handleChannelClick} />
          )}
        </>
      )}

      <SectionTitle>전체 채널</SectionTitle>
      <SearchBarContainer>
        <SearchBar onSearch={onSearch} />
      </SearchBarContainer>
      <PageContainer>
        {isLoading ? (
          <Loading />
        ) : Channels && Channels.length === 0 ? (
          <EmptyMessage>채널이 없습니다.</EmptyMessage>
        ) : (
          <GridContainer>
            {Channels.map((channel) => (
              <div key={channel.id} onClick={() => handleChannelClick(channel.id)}>
                <ChannelCard
                  name={channel.name}
                  followCount={channel.followCount}
                  tags={channel.tags}
                  img={channel.imgUrl}
                />
              </div>
            ))}
          </GridContainer>
        )}
      </PageContainer>
    </>
  );
}

const SectionTitle = styled.h3`
  margin-top: 40px;
  margin-bottom: 25px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 10px 0px 30px;
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 320px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(200px, 1fr));
  }
  @media (min-width: 2560px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const EmptyMessage = styled.p`
  padding-top: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;

export default ChannelPage;
