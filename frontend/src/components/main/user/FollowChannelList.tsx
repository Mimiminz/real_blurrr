import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import FollowChannelCard from "./FollowChannelCard";
import dummy from "@/db/mainPageData.json";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Channels } from "@/types/channelType";

interface ChannelsProp {
  followChannels: Channels[];
}

const SwiperContainer = styled.div`
  position: relative;

  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  .swiper-button-prev {
    background: url("/images/carousel_arrow_prev.png") no-repeat;
    background-size: 70% auto;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 100%;
    background-position: center;
  }

  .swiper-button-next {
    background: url("/images/carousel_arrow_next.png") no-repeat;
    background-size: 70% auto;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 100%;
    background-position: center;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: center;
  }

  .swiper-pagination-bullet {
    background: #000;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    background: ${({ theme }) => theme.colors.main};
    opacity: 1;
  }
`;

const FollowChannelList: React.FC<ChannelsProp> = ({ followChannels }) => {
  const channels = dummy.ChannelFollowList;

  return (
    <SwiperContainer>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          1440: {
            slidesPerView: 2,
            spaceBetween: 4,
          },
        }}
      >
        {followChannels.map((channel, index) => (
          <SwiperSlide key={index}>
            <FollowChannelCard
              title={channel.name}
              followers={channel.followCount}
              img={channel.img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default FollowChannelList;
