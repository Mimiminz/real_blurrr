"use client";

import React from 'react';
import styled from 'styled-components';
import dummy from "@/db/data.json";
import ChannelCard from '@/components/channel/list/ChannelCard';
import ChannelCarousel from '@/components/channel/list/ChannelCarousel'; // 경로에 맞게 변경하세요
import SearchBar from '@/components/common/UI/SearchBar'; // 경로에 맞게 변경하세요
import { useRouter } from 'next/navigation';

type Props = {}

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
  max-width: 1200px; /* 전체 그리드의 최대 너비 설정 */

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

const Channels: React.FC<Props> = (props) => {
  const router = useRouter();

  const handleCreateChannel = () => {
    router.push('/channels/dashcam')
    // 채널 생성 로직 추가
  };

  return (
    <>
      <ButtonContainer>
        <CreateButton onClick={handleCreateChannel}>채널 생성 +</CreateButton>
      </ButtonContainer>

      <SectionTitle>내가 생성한 채널</SectionTitle>
      <ChannelCarousel slides={dummy.createList.map(slide => ({
        id: slide.id,
        name: slide.name,
        followers: slide.followers,
        img: slide.img || ''
      }))} />

      <SectionTitle>내가 팔로우한 채널</SectionTitle>
      <ChannelCarousel slides={dummy.createList.map(slide => ({
        id: slide.id,
        name: slide.name,
        followers: slide.followers,
        img: slide.img || ''
      }))} />

      <TitleAndSearchContainer>
        <SectionTitle>전체 채널</SectionTitle>
        <SearchBarContainer>
          <SearchBar />
        </SearchBarContainer>
      </TitleAndSearchContainer>
      <PageContainer>
        <GridContainer>
          {dummy.AllChannels.map((item) => (
            <div key={item.id} onClick={() => console.log("item pressed")}>
              <ChannelCard
                title={item.title}
                followers={item.followers} // 좋아요 수로 가정
                tags={item.tags}
                img={item.img}
              />
            </div>
          ))}
        </GridContainer>
      </PageContainer>
    </>
  );
}

export default Channels;
