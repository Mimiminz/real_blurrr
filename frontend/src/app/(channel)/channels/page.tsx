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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
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

      <GridContainer>
        {dummy.AllChannels.map((item) => (
          <div key={item.title} onClick={() => console.log("item pressed")}>
            <ChannelCard
              title={item.title}
              followers={item.followers} // 좋아요 수로 가정
              tags={item.tags}
              img={item.img}
            />
          </div>
        ))}
      </GridContainer>
    </>
  );
}

export default Channels;
