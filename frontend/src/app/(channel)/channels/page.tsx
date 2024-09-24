"use client";

import React, { useEffect, useState } from 'react';
import ChannelCard from '@/components/channel/list/ChannelCard';
import ChannelCarousel from '@/components/channel/list/ChannelCarousel';
import SearchBar from '@/components/common/UI/SearchBar';
import { useRouter } from 'next/navigation';
import { fetchChannels, fetchFollowingChannels, fetchCreatedChannels, fetchSearchKeywords } from '@/api/channel';
import { Channels } from '@/types/channelType';
import { useAuthStore } from '@/store/authStore';
import * as S from '@/styles/channel/channelPage.styled';
import Loading from '@/app/loading';

const ChannelPage: React.FC = () => {
  const [Channels, setChannels] = useState<Channels[]>([]);
  const [FollowingChannels, setFollowingChannels] = useState<Channels[]>([]);
  const [CreatedChannels, setCreatedChannels] = useState<Channels[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [first, setFirst] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const dashcamId = process.env.NEXT_PUBLIC_DASHCAM_ID;
  const boastId = process.env.NEXT_PUBLIC_BOAST_ID;
  const { isLoggedIn } = useAuthStore();

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

  const [isMounted, setIsMounted] = useState(false); // 클라이언트 마운트 상태 추가

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 클라이언트에 마운트되었음을 표시
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <>
      {isLoggedIn && (
        <>
          {/* <S.SectionTitle>내가 생성한 채널</S.SectionTitle>
          {CreatedChannels.length === 0 ? (
            <p>생성한 채널이 없습니다</p>
          ) : (
            <ChannelCarousel slides={CreatedChannels} handleChannelClick={handleChannelClick} />
          )} */}

          <S.SectionTitle>내가 팔로우한 채널</S.SectionTitle>
          {FollowingChannels.length === 0 ? (
            <p>팔로잉한 채널이 없습니다</p>
          ) : (
            <ChannelCarousel slides={FollowingChannels} handleChannelClick={handleChannelClick} />
          )}
        </>
      )}

      <S.SectionTitle>전체 채널</S.SectionTitle>
      <S.SearchBarContainer>
        <SearchBar onSearch={onSearch} />
      </S.SearchBarContainer>
      <S.PageContainer>
        {isLoading ? (
          <Loading />
        ) : Channels && Channels.length === 0 ? (
          <S.EmptyMessage>채널이 없습니다.</S.EmptyMessage>
        ) : (
          <S.GridContainer>
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
          </S.GridContainer>
        )}
      </S.PageContainer>
    </>
  );
}

export default ChannelPage;
