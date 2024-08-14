import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useAuthStore } from "@/store/authStore";
import { DashCamDetail } from '@/types/channelType';
import { MdAccessTime } from 'react-icons/md';
import { formatPostDate } from "@/utils/formatPostDate";
import { fetchChannelLike, fetchChannelLikeDelete } from "@/api/board";
import { FaRegEye } from "react-icons/fa";
import { fetchDashCamDetail, fetchChannelBoardDelete } from '@/api/channel';
import { useRouter } from "next/navigation";
import { HiEllipsisVertical } from "react-icons/hi2";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface DashCamContentProps {
  dashCamDetailId: string;
  setCommentCount: (count: number) => void;
}

const DashCamContent: React.FC<DashCamContentProps> = ({ dashCamDetailId, setCommentCount }) => {
  const { isLoggedIn, user } = useAuthStore();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dashCamDetail, setDashCamDetail] = useState<DashCamDetail | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const swiperRef = useRef<SwiperCore>();

  const handleDropdownToggle = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleDelete = async () => {
    try {
      const isDelete = confirm("정말 삭제하실건가요?");
      if (!isDelete) {
        console.log("dadas");
        return;
      }
      await fetchChannelBoardDelete(dashCamDetailId);
      router.push(`/channels/dashcam`);

    } catch (error) {
      console.log(error);
    }
    setDropdownVisible(false);
  };

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const data = await fetchDashCamDetail(dashCamDetailId);
        setDashCamDetail(data);
        setIsLiked(data.liked ?? false);
        setLike(data.likeCount);
        setCommentCount(data.commentCount);
      } catch (error) {
        console.error('Failed to load dash cam detail:', error);
      }
    };

    loadDetail();
  }, [dashCamDetailId]);

  const toggleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isLiked) {
        const likeData = await fetchChannelLikeDelete(dashCamDetailId);
        setLike(likeData.likeCount);
        setIsLiked(likeData.isLike);
      } else {
        const likeData = await fetchChannelLike(dashCamDetailId);
        setLike(likeData.likeCount);
        setIsLiked(likeData.isLike);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!dashCamDetail) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <TitleRow>
        <Title>
          {dashCamDetail.title}
        </Title>
        {user?.nickname === dashCamDetail.member.nickname && (
          <DropdownContainer ref={dropdownRef}>
            <HiEllipsisVertical onClick={handleDropdownToggle} />
            {isDropdownVisible && (
              <DropdownMenu>
                <DropdownItem onClick={handleDelete}>삭제</DropdownItem>
              </DropdownMenu>
            )}
          </DropdownContainer>
        )}
      </TitleRow>
      <Header>
        <User>
          <Avatar src={dashCamDetail.member.profileUrl} alt={`${dashCamDetail.member.nickname}'s avatar`} />
          <UserInfo>
            <Username>{dashCamDetail.member.nickname}</Username>
            <CarInfo>{dashCamDetail.member.carTitle || '뚜벅이'}</CarInfo>
          </UserInfo>
        </User>
        <TimeSection>
          <FormatDate>
            <FaRegHeart />
            {like}
          </FormatDate>
          <FormatDate>
            <FaRegEye />
            {dashCamDetail.viewCount}
          </FormatDate>
          <FormatDate>
            <MdAccessTime />
            {formatPostDate(dashCamDetail.createdAt)}
          </FormatDate>
        </TimeSection>
      </Header>
      <Body>
        {dashCamDetail.mentionedLeagues.length > 0 && (
          <Tags>
            {dashCamDetail.mentionedLeagues.map((league, index) => (
              <Tag key={index}>@ {league.name}</Tag>
            ))}
          </Tags>
        )}
        <SwiperContainer>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={false}
            navigation={true}
            modules={[Navigation]}
          >
            {dashCamDetail.videos.map((video) => (
              <StyledSwiperSlide key={video.videoOrder}>
                <Video $videoCount={dashCamDetail.videos.length} controls loop>
                  <source src={video.videoUrl} type="video/mp4" />
                </Video>
              </StyledSwiperSlide>
            ))}
          </Swiper>
        </SwiperContainer>
        <Content dangerouslySetInnerHTML={{ __html: dashCamDetail.content }} />
        <WriterContainer>
          {isLoggedIn && (
            <HeartButton onClick={toggleLike} $isLiked={isLiked}>
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              좋아요
            </HeartButton>
          )}
        </WriterContainer>
      </Body>
    </Container>
  );
};

const SwiperContainer = styled.div`
  width: 100%;
  max-width: 600px; 
  margin: 0 auto;
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Video = styled.video<{ $videoCount: number }>`
  width: 500px;
  max-width: 100%;
  height: auto;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 10px;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 5px 28px;
`;

const Title = styled.h3`
  margin: 0;
  `;

const TitleRow = styled.div`
  padding: 13px 15px 13px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e0e0e0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2spx;
  font-size: 14px;
  color: #999;

  svg {
    margin-right: 4px;
    font-size: 16px;
  }
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

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
  margin-top: 15px;
`;

const HeartButton = styled.button<{ $isLiked: boolean }>`
  padding-top: 30px;
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f8f8f8;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #ebebeb;
  }

  svg {
    margin-right: 5px;
    font-size: 17px;
    color: #d60606;
  }
`;

const WriterContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 10px;
`;

const TimeSection = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 8px;
  margin-top: auto;
  color: #999;
  font-size: 14px;
  gap: 10px;
`;

const DropdownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-bottom: auto;
  padding-top: 2px;

  svg {
    cursor: pointer;
    font-size: 23px;
    color: #999;
    transition: color 0.3s;

    &:hover {
      color: #ff900d;
    }
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 25px;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  overflow: hidden;
  min-width: 80px;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: 768px) {
    min-width: 120px;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  background-color: white;
  color: #333;
  font-size: 13px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #ff900d;
    color: white;
  }

  &:first-child {
    border-bottom: 1px solid #ddd;
  }
`;

export default DashCamContent;
