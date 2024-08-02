import React from "react";
import styled from "styled-components";
import dummy from "@/db/mainPageData.json";
import { FaRegHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const topCar = dummy.topCar;

const TopCarCard: React.FC = () => {
  const router = useRouter();
  const channelId = "aff4d655-9a8f-49c6-ab80-6e9270d5691a";

  const handleClick = () => {
    router.push(`/channels/${channelId}/${topCar.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        <Image src={topCar.image} alt="Top Car" />
        <LikeContainer>
          <FaRegHeart />
          <LikeCount>{topCar.views}</LikeCount>
        </LikeContainer>
      </ImageContainer>
      <InfoContainer>
        <Owner>{topCar.name}</Owner>
        <Description>{topCar.description}</Description>
      </InfoContainer>
    </CardContainer>
  );
};

export default TopCarCard;

const CardContainer = styled.div`
  border-radius: 12px;
  width: 100%;
  cursor: pointer;
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 75%;
  position: relative;
  border-radius: 15px;
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20%;
  background: rgba(255, 255, 255, 0.705);
  color: black;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
  box-sizing: border-box;
`;

const LikeCount = styled.span`
  font-size: 16px;
  color: black;
  padding-left: 6px;
`;

const InfoContainer = styled.div`
  margin-top: 12px;
  text-align: left;
`;

const Owner = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: black;
  margin: 0;
`;

const Description = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subDiscription};
  margin: 0;
`;
