import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import FollowChannelCard from "./FollowChannelCard";

import dummy from "@/db/mainPageData.json";

const SwiperContainer = styled.div`
  /* position: relative; */
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  .swiper-button-prev {
    background: url("/images/carousel_arrow_prev.png") no-repeat;
    opacity: 0.7;
    background-size: 70% auto;
    background-position: center;
  }

  .swiper-button-next {
    background: url("/images/carousel_arrow_next.png") no-repeat;
    opacity: 0.7;
    background-size: 70% auto;
    background-position: center;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

const FollowChannelList: React.FC = () => {
  const channels = dummy.ChannelFollowList;

  return (
    <SwiperContainer>
      <Swiper spaceBetween={0} slidesPerView={1} navigation loop>
        {channels.map((channel, index) => (
          <SwiperSlide key={index}>
            <FollowChannelCard
              title={channel.name}
              followers={channel.followers}
              img={channel.img}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default FollowChannelList;
