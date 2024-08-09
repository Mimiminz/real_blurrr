import React from 'react';
import styled from 'styled-components';
import { FiEye, FiHeart } from 'react-icons/fi';
import { Boasts } from '@/types/channelType';

interface BoastCardProps {
  boast: Boasts;
}

const Card = styled.div`
  width: 100%;
  max-width: 300px;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(141, 141, 141, 0.1);
  margin: 10px;
  position: relative;
  aspect-ratio: 1; /* 정사각형 유지 */
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

const BoastCard: React.FC<BoastCardProps> = ({ boast }) => {
  return (
    <Card>
      <Thumbnail src={boast.thumbNail} alt="thumbnail" />
      <HoverOverlay>
        <span><FiEye /> {boast.viewCnt}</span>
        <span><FiHeart /> {boast.likeCnt}</span>
      </HoverOverlay>
    </Card>
  );
};

export default BoastCard;
