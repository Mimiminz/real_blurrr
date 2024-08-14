import React from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";

interface ChannelCardProps {
  id: string;
  title: string;
  followers: number;
  img: string;
}

const FollowChannelCard: React.FC<ChannelCardProps> = ({
  id,
  title,
  followers,
  img,
}) => {
  const displayTitle = title.length > 8 ? `${title.slice(0, 5)}...` : title;

  const router = useRouter();

  const channelImg = img || "/images/logo/logo.png";

  const handleClick = () => {
    if (id === process.env.NEXT_PUBLIC_DASHCAM_ID) {
      router.push(`/channels/dashcam`);
    } else if (id === process.env.NEXT_PUBLIC_BOAST_ID) {
      router.push("/channels/boast");
    } else {
      router.push(`/channels/${id}`);
    }
  };

  return (
    <CardContainer onClick={handleClick}>
      <ChannelImage src={channelImg} alt="Channel Profile" />
      <TitleContainer>
        <Title>{displayTitle}</Title>
        {title.length > 8 && <Tooltip>{title}</Tooltip>}
      </TitleContainer>
    </CardContainer>
  );
};

export default FollowChannelCard;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  padding: 10px;
  margin: 10px;
  width: 90px;
  padding-bottom: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transition: 0.3s ease-in-out;
    transform: translateY(-5px) scale(1.05);
  }
`;

const ChannelImage = styled.img`
  width: 100px;
  height: 90px;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const ImageContainer = styled.div<{ img: string }>`
  width: 100px;
  height: 90px;
  background-color: #e5e7eb;
  border-radius: 8px;
  background-position: center;
  background-image: url(${(props) => props.img});
  margin-bottom: 10px;
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
`;

const Tooltip = styled.div`
  font-size: 10px;
  visibility: hidden;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 10;
  top: 110%; /* 툴팁이 아래에 나타나도록 조정 */
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;

  /* 화살표 스타일 */
  &::after {
    content: "";
    position: absolute;
    bottom: 100%; /* 툴팁 위쪽에 화살표 추가 */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  ${CardContainer}:hover & {
    visibility: visible;
  }
`;