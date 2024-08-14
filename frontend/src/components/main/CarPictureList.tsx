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
  if (!myCarBoards || myCarBoards.length <= 0) {
    return <NoBoard>게시글이 없습니다. </NoBoard>;
  }

  const filteredCarBoards =
    myCarBoards.length > 6 && myCarBoards.length % 2 !== 0
      ? myCarBoards.slice(0, -1)
      : myCarBoards;

  const settings = {
    dots: true,
    arrows: filteredCarBoards.length > 3 ? true : false,
    infinite: filteredCarBoards.length > 6 ? true : false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    speed: 500,
    rows: filteredCarBoards.length >= 6 ? 2 : 1,
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
          infinite: filteredCarBoards.length > 6 ? true : false,
          dots: filteredCarBoards.length > 6 ? true : false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // rows: 2,
          dots: true,
          arrows: filteredCarBoards.length > 6 ? true : false,
          infinite: filteredCarBoards.length > 6 ? true : false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: filteredCarBoards.length > 6 ? true : false,
          infinite: filteredCarBoards.length > 6 ? true : false,
        },
      },
    ],
  };

  return (
    <Container>
      <CarouselContainer>
        <Slider {...settings}>
          {filteredCarBoards.map((myCar) => (
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
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselContainer = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  justify-items: left;
  .slick-slider {
    display: flex;
    flex-direction: column;
    justify-items: left;
  }

  .slick-list {
    margin: 0 auto;
    padding: 10px 0;
    width: 70%;
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

  @media (min-width: 480px) {
    width: 400px;
  }
  @media (min-width: 768px) {
    width: 580px;
  }

  @media (min-width: 1024px) {
    .slick-list {
      margin: 0 auto;
      padding: 10px 0;
      width: 90%;
    }
  }
`;

const NoBoard = styled.div`
  margin-top: 30px;
`;

export default CarPictureList;
