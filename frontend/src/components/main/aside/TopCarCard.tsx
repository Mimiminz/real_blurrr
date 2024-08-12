import React from "react";
import styled from "styled-components";
import dummy from "@/db/mainPageData.json";
import { FaRegHeart } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { TodayCarItem } from "@/types/mainPageTypes";

const topCar = dummy.topCar;

interface TopCarCardProps {
  todayCar: TodayCarItem | null;
}

const TopCarCard: React.FC<TopCarCardProps> = ({ todayCar }) => {
  const router = useRouter();

  if (!todayCar) {
    return <div>올라온 게시글이 없습니다</div>;
  }
  const handleClick = () => {
    router.push(`/channels/boast/${todayCar.id}`);
  };

  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        <Image src={todayCar.thumbnail} alt="Top Car" />
        <LikeContainer>
          <FaRegHeart />
          <LikeCount>{todayCar.likeCount}</LikeCount>
        </LikeContainer>
      </ImageContainer>
      <InfoContainer>
        <Owner>{todayCar.member.nickname}</Owner>
        <Description>ㆍ{todayCar.member.carTitle}</Description>
      </InfoContainer>
    </CardContainer>
  );
};

export default TopCarCard;

const CardContainer = styled.div`
  overflow: hidden;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  margin-top: 5px;
  border-radius: 15px;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;

  /* &:hover {
    background-color: #ebebeb6a;
  } */
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 15px;
  padding-top: 75%; /* Aspect ratio 4:3 */
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const LikeContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.712);
  border-radius: 15px;
  padding: 4px 8px;
  color: white;
`;

const LikeCount = styled.span`
  font-size: 12px;
  margin-left: 4px;
`;

const InfoContainer = styled.div`
  padding: 4px 6px 8px 6px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: end;
`;

const Owner = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 6px 0 4px 0;
`;

const Description = styled.p`
  font-size: 11.5px;
  color: ${({ theme }) => theme.colors.subDiscription};
  margin: 0 0 4px 0;
  white-space: normal;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;
