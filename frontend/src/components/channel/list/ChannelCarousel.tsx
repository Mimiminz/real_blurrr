import React, { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, Autoplay } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import UserChannelCard from './UserChannelCard';

SwiperCore.use([Scrollbar, Autoplay]);

interface ChannelCarouselProps {
   slides: Array<{
      id: string;
      name: string;
      followCount: number;
      imgUrl: string;
   }>;
   handleChannelClick: (channelId: string) => void;
}

const ChannelCarousel: React.FC<ChannelCarouselProps> = ({ slides, handleChannelClick }) => {
   const swiperRef = useRef<SwiperCore>();

   const getSlidesPerView = () => {
      if (window.innerWidth >= 1440) return 5;
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 480) return 2;
      return 1;
   };

   const slidesPerView = getSlidesPerView();
   const shouldEnablePaginationAndAutoplay = slides.length > slidesPerView;

   return (
      <SwiperContainer>
         <Swiper
            onSwiper={(swiper => {
               swiperRef.current = swiper;
            })}
            loop={false}
            spaceBetween={0}
            slidesPerGroup={1}
            pagination={shouldEnablePaginationAndAutoplay ? {
               clickable: true,
               renderBullet: (index, className) => {
                  // 페이지네이션 버튼의 개수를 조절하는 부분
                  const numBullets = slides.length - slidesPerView; // 5개의 카드를 보여주므로, 5개를 뺌
                  if (index >= 2 && index < numBullets + 2) { // 인덱스 2부터 시작
                     return `<span class="${className}"></span>`;
                  }
                  return '';
               },
            } : false}
            modules={[Pagination]}
            slidesOffsetAfter={10}
            autoplay={shouldEnablePaginationAndAutoplay ? {
               delay: 3500,
               disableOnInteraction: false,
               pauseOnMouseEnter: true,
               reverseDirection: true,
            } : false}
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
               <SwiperSlideStyled key={slide.id}>
                  <UserChannelCardStyled
                     name={slide.name}
                     followCount={slide.followCount}
                     img={slide.imgUrl}
                     onClick={(e) => {
                        e.stopPropagation();
                        handleChannelClick(slide.id);
                     }}
                  />
               </SwiperSlideStyled>
            ))}
         </Swiper>
      </SwiperContainer>

   );
};

const SwiperContainer = styled.div`
  padding: 10px; 

  .swiper-pagination {
    position: relative;
  }
`;

const SwiperSlideStyled = styled(SwiperSlide)`
  padding: 10px; 
  box-sizing: border-box; 
`;

const UserChannelCardStyled = styled(UserChannelCard)`
  overflow: visible; 
`;


export default ChannelCarousel;
