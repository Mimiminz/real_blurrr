import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { FiEye, FiHeart } from "react-icons/fi";
import { Boasts } from "@/types/channelType";

interface BoastCardProps {
  boast: Boasts;
}

const BoastCard: React.FC<BoastCardProps> = ({ boast }) => {
  const [imagePath, setImagePath] = useState(boast.thumbNail);

  return (
    <Card>
      <Thumbnail
        src={imagePath}
        alt="thumbnail"
        onError={() => setImagePath('/images/logo/logo.png')} />
      <HoverOverlay>
        <span>
          <FiEye /> {boast.viewCnt}
        </span>
        <span>
          <FiHeart /> {boast.likeCnt}
        </span>
      </HoverOverlay>
    </Card>
  );
};

const bounceIn = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.9;
  }
  60% {
    transform: scale(1.04);
    opacity: 0.95;
  }
  100% {
    transform: scale(1.03);
    opacity: 1;
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 300px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(141, 141, 141, 0.1);
  position: relative;
  aspect-ratio: 1; /* 정사각형 유지 */
  cursor: pointer;
  transition: transform 0.3s ease;
  transform-origin: center; /* 변환 중심을 요소의 중앙으로 설정 */
  will-change: transform; /* 브라우저에게 사전 렌더링 힌트 제공 */

  &:hover {
    animation: ${bounceIn} 0.5s forwards;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HoverOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }

  span {
    color: white;
    margin: 0 10px;
    display: flex;
    align-items: center;
    gap: 7px;
  }
`;

export default BoastCard;
