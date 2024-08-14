import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FollowChannelCard from "./FollowChannelCard";
import { Channels } from "@/types/channelType";

interface ChannelsProp {
  followChannels: Channels[];
}

const FollowChannelList: React.FC<ChannelsProp> = ({ followChannels }) => {
  const settings = {
    dots: followChannels.length > 2 ? true : false,
    arrows: false,
    centerPadding: "60px",
    infinite: false,
    slidesToShow: followChannels.length > 2 ? 2 : followChannels.length,
    autoplay: followChannels.length > 2 ? true : false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <Container>
      <CarouselContainer>
        <Slider {...settings}>
          {followChannels.map((channel, index) => (
            <FollowChannelCard
              key={index}
              title={channel.name}
              followers={channel.followCount}
              img={channel.imgUrl}
              id={channel.id}
            />
          ))}
        </Slider>
      </CarouselContainer>
    </Container>
  );
};

export default FollowChannelList;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const CarouselContainer = styled.div`
  .slick-list {
    z-index: 10;
  }
  .slick-slider {
    display: flex;
    flex-direction: column;
  }
  .slick-list {
    width: 350px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
  }

  .slick-dots {
    position: relative;
    height: 20px;
    bottom: 0px;
    z-index: 0;
  }

  .slick-dots li button:before {
    color: #4b574b;
    font-size: 10px;
  }

  div {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 3px;
  }

  @media (min-width: 900px) {
    .slick-list {
      width: 290px;
    }
  }
  @media (min-width: 1130px) {
    .slick-list {
      width: 390px;
    }
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (min-width: 900px) {
    justify-content: flex-start;
  }
`;
