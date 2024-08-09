"use client"

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChannelCard from '@/components/channel/list/ChannelCard';
import ChannelCarousel from '@/components/channel/list/ChannelCarousel'; // 경로에 맞게 변경하세요
import SearchBar from '@/components/common/UI/SearchBar'; // 경로에 맞게 변경하세요
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
  const [keywords, setKeywords] = useState<string[]>([]);
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

  const loadChannelsByKeywords = async (newKeywords: string[]) => {
    try {
      if (newKeywords.length === 0) {
        const ChannelData = await fetchChannels();
        setChannels(ChannelData ? ChannelData.content : []);
      } else {
        const searchResults = await fetchSearchKeywords(newKeywords);
        setChannels(searchResults);
      }
    } catch (error) {
      console.error('Error fetching channels data:', error);
    }
  };

  const onSearch = async (newKeyword: string) => {
    if (!newKeyword.trim()) {
      return;
    }

    if (keywords.length >= 5) {
      alert('태그는 5개까지 검색 가능합니다');
      return;
    }

    const newKeywords = [...keywords, newKeyword];
    setKeywords(newKeywords);
    loadChannelsByKeywords(newKeywords);
  };

  const handleRemoveKeyword = async (keywordToRemove: string) => {
    const newKeywords = keywords.filter(keyword => keyword !== keywordToRemove);
    setKeywords(newKeywords);
    loadChannelsByKeywords(newKeywords);
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
      <KeywordContainer>
        {keywords.map((keyword, index) => (
          <Keyword key={index}>
            <KeywordText>{keyword}</KeywordText>
            <RemoveKeywordButton onClick={() => handleRemoveKeyword(keyword)}>×</RemoveKeywordButton>
          </Keyword>
        ))}
      </KeywordContainer>
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

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  margin: 10px 0;
`;

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const KeywordContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  margin-bottom: 10px;
  overflow-x: auto; /* 가로 스크롤 추가 */
  min-height: 50px;
  max-height: 50px; 
  padding: 10px;
  box-sizing: border-box;
`;

const Keyword = styled.div`
  padding: 5px 10px;
  background-color: #374151;
  border-radius: 10px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

const KeywordText = styled.span`
  margin-right: 8px;
  color: #fff;
`;

const RemoveKeywordButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 480px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(200px, 1fr));
  }
`;

const EmptyMessage = styled.p`
  padding-top: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;

export default ChannelPage;
