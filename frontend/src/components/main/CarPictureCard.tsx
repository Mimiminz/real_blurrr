import React from "react";
import styled from "styled-components";
import { FaEye } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface CarPicture {
  id: string;
  name: string;
  description: string;
  image: string;
  views: number;
}

function CarPictureCard({ id, name, description, image, views }: CarPicture) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/channels/${process.env.NEXT_PUBLIC_BOAST_ID}/${id}`);
  };
  return (
    <Container onClick={handleClick}>
      <ImageContainer>
        <Image src={image} alt="Car" />
      </ImageContainer>
      <InfoContainer>
        <TextContainer>
          <Name>{name}</Name>
          <Description>{description}</Description>
        </TextContainer>
        <Views>
          <Icon>
            <FaEye />
          </Icon>
          {views}
        </Views>
      </InfoContainer>
    </Container>
  );
}

export default CarPictureCard;

const Container = styled.div`
  width: 90%;
  max-width: 250px; // Adjust this as needed to fit your design
  height: auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ebebebc3;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 75%;
  background-color: #d8d8d8;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.p`
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

const Views = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: gray;
  margin-bottom: auto;
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 아이콘 크기 조정 */
  vertical-align: middle;
`;
