// import styled from "styled-components";
// import CarPictureListItem from "./CarPictureListItem";
// import dummy from "@/db/mainPageData.json";

// const CarPictureList = () => {
//   return (
//     <ArticleList>
//       {dummy.carPicture.map((article, index) => (
//         <CarPictureListItem
//           key={index}
//           name={article.name}
//           description={article.description}
//           image={article.image}
//           views={article.views}
//         />
//       ))}
//     </ArticleList>
//   );
// };

// const ArticleList = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

// export default CarPictureList;

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
        spaceBetween={100}
        slidesPerView={3}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
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
