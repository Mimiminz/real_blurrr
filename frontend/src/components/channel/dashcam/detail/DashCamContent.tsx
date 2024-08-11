import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { DashCamContentData } from '@/types/channelType';
import { MdAccessTime } from 'react-icons/md';

const DashCamContent: React.FC<DashCamContentData> = ({
  id,
  member,
  title,
  createdAt,
  videoUrl,
  content,
  mentionedLeagues,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const changeVideo = (newIndex: number, direction: 'next' | 'prev') => {
   setIsSliding(true);
   setSlideDirection(direction);
   setTimeout(() => {
     setCurrentIndex(newIndex);
     setIsSliding(false);
   }, 300); // 300ms 동안의 슬라이드 효과
 };
 
 const nextVideo = () => {
   if (currentIndex < videoUrl.length - 1) {
     changeVideo(currentIndex + 1, 'next');
   }
 };
 
 const prevVideo = () => {
   if (currentIndex > 0) {
     changeVideo(currentIndex - 1, 'prev');
   }
 };

  const formatPostDate = (createdAt: string) => {
    const postDate = new Date(createdAt);
    const today = new Date();

    if (postDate.toDateString() === today.toDateString()) {
      return postDate.toLocaleTimeString([], {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });
    } else {
      return postDate.toISOString().split('T')[0].replace(/-/g, '.');
    }
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Header>
        <User>
          <Avatar src={member.profileUrl} alt={`${member.nickname}'s avatar`} />
          <UserInfo>
            <Username>{member.nickname}</Username>
            <CarInfo>{member.carTitle || '뚜벅이'}</CarInfo>
          </UserInfo>
        </User>
        <TimeSection>
          <Icon>
            <MdAccessTime />
          </Icon>
          <FormatDate>{formatPostDate(createdAt)}</FormatDate>
        </TimeSection>
      </Header>
      <Body>
        {mentionedLeagues.length > 0 && (
          <Tags>
            {mentionedLeagues.map((league, index) => (
              <Tag key={index}>@ {league.name}</Tag>
            ))}
          </Tags>
        )}
        <VideoSliderContainer>
          <ArrowButton onClick={prevVideo} disabled={currentIndex === 0}>
            <FaArrowLeft />
          </ArrowButton>
          <VideoWrapper isSliding={isSliding} direction={slideDirection}>
            <video controls autoPlay loop>
              <source src={videoUrl[currentIndex]} type="video/mp4" />
            </video>
          </VideoWrapper>
          <ArrowButton onClick={nextVideo} disabled={currentIndex === videoUrl.length - 1}>
            <FaArrowRight />
          </ArrowButton>
        </VideoSliderContainer>
        <Content dangerouslySetInnerHTML={{ __html: content }} />
        <HeartButton onClick={toggleLike}>
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </HeartButton>
      </Body>
    </Container>
  );
};

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;

// 스타일 컴포넌트 정의
const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 16px;
  padding: 5px 28px;
`;

const Title = styled.h3`
  padding: 13px 28px;
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
`;

const Body = styled.div`
  padding: 0 28px;
`;

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  font-weight: bold;
`;

const CarInfo = styled.div`
  color: #666;
  font-size: 13px;
  margin-top: 4px;
`;

const FormatDate = styled.div`
  font-size: 14px;
  color: #999;
`;

const Tags = styled.div`
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background-color: #ddd;
  border-radius: 9px;
  padding: 4px 8px;
  margin-right: 8px;
  font-size: 12px;
`;

const VideoSliderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const VideoWrapper = styled.div<{ isSliding: boolean; direction: 'next' | 'prev' }>`
  width: 100%;
  animation: ${({ isSliding, direction }) => 
    isSliding 
      ? direction === 'next' 
        ? slideOut 
        : slideIn 
      : 'none'} 300ms ease-in-out;

  video {
    width: 100%;
    height: auto;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #666;

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
  margin-top: 15px;
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  vertical-align: middle;
`;

const HeartButton = styled.button`
  margin: 30px 0 0 auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #666;
  display: flex;
  justify-content: flex-end;

  &:hover {
    color: #ff6b6b;
  }
`;

const TimeSection = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 8px;
  margin-top: auto;
  color: #999;
  font-size: 14px;
`;

export default DashCamContent;
