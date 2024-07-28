import React, { useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CarPictureListItem from "./CarPictureListItem";
import dummy from "@/db/mainPageData.json";

SwiperCore.use([Navigation, Autoplay]);

const SwiperContainer = styled.div`
  position: relative;
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
  padding-top: 10px;

  .swiper-slide {
    display: flex;
    justify-content: center;
  }
`;

const CarPictureList: React.FC = () => {
  const swiperRef = useRef<SwiperCore>();

  const groupedItems = [];
  for (let i = 0; i < dummy.carPicture.length / 2; i++) {
    groupedItems.push([dummy.carPicture[i], dummy.carPicture[i + 5]]);
  }

  return (
    <SwiperContainer>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 100,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 200,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 200,
          },
        }}
      >
        {groupedItems.map((group, index) => (
          <SwiperSlide key={index}>
            <CarPictureListItem items={group} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};

export default CarPictureList;
