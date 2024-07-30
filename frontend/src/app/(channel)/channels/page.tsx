"use client";

import dummy from '@/db/data.json'

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChannelCard from '@/components/channel/list/ChannelCard';
import ChannelCarousel from '@/components/channel/list/ChannelCarousel'; // 경로에 맞게 변경하세요
import SearchBar from '@/components/common/UI/SearchBar'; // 경로에 맞게 변경하세요
import { useRouter } from 'next/navigation';
import { fetchChannels, fetchFollowingChannels, fetchCreatedChannels } from '@/api/channel';
import { Channels } from '@/types/channelType';
import { useAuthStore } from '@/store/authStore';

const SectionTitle = styled.h3`
  margin-top: 40px;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
`;

const CreateButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 400;
  color: #fff;
  background-color: #6b7280;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #4b5563;
  }
`;

const TitleAndSearchContainer = styled.div`
  margin-bottom: 20px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 20px 0;
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center; /* 부모 컨테이너를 중앙 정렬 */
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center; /* 그리드 항목을 수평으로 중앙에 배치 */
  margin: 0 auto;
  width: 100%;

  /* 핸드폰 설정 */
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }

  /* 태블릿 크기 이상 설정 */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }

  /* 데스크탑 크기 이상 설정 */
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }

  /* 큰 데스크탑 크기 이상 설정 */
  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(200px, 1fr));
  }
`;

const ChannelPage: React.FC = () => {

  const [Channels, setChannels] = useState<Channels[]>([]);
  const [FollowingChannels, setFollowingChannels] = useState<Channels[]>([]);
  const [CreatedChannels, setCreatedChannels] = useState<Channels[]>([]);

  const router = useRouter();
  const accessToken = useAuthStore.getState().accessToken;

  useEffect(() => {
    const loadData = async () => {
      try {
        const ChannelData = await fetchChannels();
        const FollowingChannelData = await fetchFollowingChannels();
        const CreatedChannelData = await fetchCreatedChannels();
        setChannels(ChannelData);
        setFollowingChannels(FollowingChannelData);
        setCreatedChannels(CreatedChannelData);
      } catch (error) {
        console.error('Failed to channels data:', error);
      }
    };

    loadData();
  }, []);

  const handleCreateChannel = () => {
    router.push('/channels/dashcam')
    // 채널 생성 로직 추가
  };

  return (
    <>
      {accessToken && (
        <>
          <ButtonContainer>
            <CreateButton onClick={handleCreateChannel}>채널 생성 +</CreateButton>
          </ButtonContainer>

          <SectionTitle>내가 생성한 채널</SectionTitle>
          <ChannelCarousel slides={CreatedChannels.map(slide => ({
            id: slide.id,
            name: slide.name,
            followCount: slide.followCount,
            imgUrl: slide.imgUrl || ''
          }))} />

          <SectionTitle>내가 팔로우한 채널</SectionTitle>
          <ChannelCarousel slides={FollowingChannels.map(followChannel => ({
            id: followChannel.id,
            name: followChannel.name,
            followCount: followChannel.followCount,
            imgUrl: followChannel.imgUrl || ''
          }))} />
        </>
      )}

      <TitleAndSearchContainer>
        <SectionTitle>전체 채널</SectionTitle>
        <SearchBarContainer>
          <SearchBar />
        </SearchBarContainer>
      </TitleAndSearchContainer>
      <PageContainer>
        <GridContainer>
          {Channels.map((channel) => (
            <div key={channel.id} onClick={() => console.log("item pressed")}>
              <ChannelCard
                name={channel.name}
                followCount={channel.followCount}
                tags={channel.tags}
                imgUrl={channel.imgUrl}
              />
            </div>
          ))}
        </GridContainer>
      </PageContainer>
    </>
  );
}

export default ChannelPage;
