"use client";

import React from 'react';
import styled from 'styled-components';
import dummy from "../../../db/data.json";
import UserChannelCard from '../../../components/channel/UserChannelCard';
import ChannelCard from '../../../components/channel/ChannelCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {}

const Container = styled.div`
  margin: 0px 300px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.25rem;
  font-weight: 600;
`;

const SwiperContainer = styled.div`
  margin-bottom: 40px;
`;

const SearchInputContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 50%;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
`;

const CardWrapper = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 8px;
`;

const Channels: React.FC<Props> = (props) => {

  SwiperCore.use([Navigation, Scrollbar, Autoplay]);

  return (
    <Container>
      <SectionTitle>내가 생성한 채널</SectionTitle>
      <SwiperContainer>
        <Swiper
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {dummy.createList.map((slide) => (
            <SwiperSlide key={slide.id}>
              <UserChannelCard key={slide.id} name={slide.name} followers={slide.followers} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>

      <SectionTitle>내가 팔로우한 채널</SectionTitle>
      <SwiperContainer>
        <Swiper
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          navigation={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {dummy.createList.map((slide) => (
            <SwiperSlide key={slide.id}>
              <UserChannelCard key={slide.id} name={slide.name} followers={slide.followers} />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperContainer>

      <SectionTitle>전체 채널</SectionTitle>
      <SearchInputContainer>
        <SearchInput
          type="text"
          placeholder="Search"
        />
      </SearchInputContainer>
      <GridContainer>
        {dummy.AllChannels.map((item) => (
          <CardWrapper key={item.title} onClick={() => console.log("item pressed")}>
            <ChannelCard
              title={item.title}
              likes={item.followers} // 좋아요 수로 가정
              tags={item.tags}
              img={item.img}
            />
          </CardWrapper>
        ))}
      </GridContainer>
    </Container>
  );
}

export default Channels;
