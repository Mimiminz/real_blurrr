import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyCarItem } from "@/types/mainPageTypes";
import CarPictureCard from "./CarPictureCard";

interface CarPictureProps {
  myCarBoards: MyCarItem[];
}

interface SlickButtonFixProps {
  currentSlide?: number;
  slideCount?: number;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}

const SlickButtonFix: React.FC<SlickButtonFixProps> = ({
  currentSlide,
  slideCount,
  children,
  ...props
}) => <span {...props}>{children}</span>;

export const NextTo = styled.div`
  background-image: url("/images/carousel_arrow_next.png");
  background-size: contain;
  line-height: 0;
  position: absolute;
  top: 50%;
  right: 0;
  display: block;
  height: 20px;
  width: 20px;
`;

export const Prev = styled.div`
  transform: rotate(180deg);
  background-image: url("/images/carousel_arrow_next.png");
  background-size: contain;
  line-height: 0;
  position: absolute;
  top: 50%;
  left: 0;
  display: block;
  height: 20px;
  width: 20px;
`;

const CarPictureList: React.FC<CarPictureProps> = ({ myCarBoards }) => {
  const settings = {
    dots: true,
    arrows: true,
    infinite: myCarBoards.length > 6 ? true : false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 500,
    rows: 2,
    //오른쪽 화살표
    nextArrow: (
      <SlickButtonFix>
        <NextTo />
      </SlickButtonFix>
    ),
    //왼쪽 화살표
    prevArrow: (
      <SlickButtonFix>
        <Prev />
      </SlickButtonFix>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          rows: 2,
          dots: true,
          arrows: true,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 2,
          dots: true,
          arrows: true,
          infinite: true,
        },
      },
    ],
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {myCarBoards.length > 0 &&
          myCarBoards.map((myCar) => (
            <CarPictureCard
              key={myCar.id}
              id={myCar.id}
              name={myCar.member.nickname}
              description={myCar.member.carTitle}
              image={myCar.thumbnail}
              views={myCar.viewCount}
            />
          ))}
      </Slider>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  .slick-slider {
    display: flex;
    flex-direction: column;
  }

  .slick-list {
    margin: 0 auto;
    padding: 10px 0;
    width: 90%;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .slick-prev {
    left: 0;
  }
  .slick-next {
    right: 0;
  }
`;

export default CarPictureList;
