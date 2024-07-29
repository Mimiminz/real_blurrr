import React, { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import UserChannelCard from './UserChannelCard';

SwiperCore.use([Navigation, Scrollbar, Autoplay]);

const SwiperContainer = styled.div`
  .swiper-button-next::after,
  .swiper-button-prev::after {
    display: none;
  }

  .swiper-button-active {
   margin-left: 0px;
  }

  .swiper-button-prev {
    background: url('/images/carousel_arrow_prev.png') no-repeat;
    opacity: 0.7;
    background-size: 70% auto;
    background-position: center;
  }

  .swiper-button-next {
    background: url('/images/carousel_arrow_next.png') no-repeat;
    opacity: 0.7;
    background-size: 70% auto;
    background-position: center;
  }
`;

interface ChannelCarouselProps {
   slides: Array<{
      id: string;
      name: string;
      followers: number;
      img: string;
   }>;
}

const ChannelCarousel: React.FC<ChannelCarouselProps> = ({ slides }) => {
   const swiperRef = useRef<SwiperCore>();

   return (
      <SwiperContainer>
         <Swiper
            onSwiper={(swiper => {
               swiperRef.current = swiper;
            })}
            loop={true}
            spaceBetween={0}
            navigation={true}
            slideToClickedSlide={true}
            slidesOffsetAfter={10}
            autoplay={{
               delay: 2500,
               disableOnInteraction: false,
            }}
            breakpoints={{
               320: { // 작은 화면
                  slidesPerView: 1,
               },
               480: {
                  slidesPerView: 2,
                  spaceBetween: 10,
               },
               768: { // 태블릿
                  slidesPerView: 3,
                  spaceBetween: 10,
               },
               1024: { // 작은 데스크탑
                  slidesPerView: 4,
                  spaceBetween: 20,
               },
               1440: { // 큰 데스크탑
                  slidesPerView: 5,
                  spaceBetween: 30,
               },
            }}
         >
            {slides.map((slide) => (
               <SwiperSlide key={slide.id}>
                  <UserChannelCard
                     name={slide.name}
                     followers={slide.followers}
                     img={slide.img}
                  />
               </SwiperSlide>
            ))}
         </Swiper>
      </SwiperContainer >
   );
};

export default ChannelCarousel;
