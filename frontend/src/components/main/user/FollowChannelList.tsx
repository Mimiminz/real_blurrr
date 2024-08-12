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
    dots: true,
    arrows: false,
    infinite: followChannels.length > 3 ? true : false,
    centerPadding: "60px",
    slidesToShow: followChannels.length > 3 ? 3 : followChannels.length,
    slidesToScroll: 1,
    autoplay: followChannels.length > 3 ? true : false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
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
    width: 450px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: center;
  }
  /* .slick-prev,
  .slick-next {
    display: none;
  }

  .slick-prev:before,
  .slick-next:before {
    display: none;
    color: black;
    font-size: 20px;
  }

  .slick-next:before {
    content: "";
  } */
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
    justify-content: center;
    align-items: center;
    margin-bottom: 3px;
  }

  @media (min-width: 900px) {
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
