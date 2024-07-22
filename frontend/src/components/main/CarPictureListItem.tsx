// components/CarPictureListItem.tsx
import React from "react";
import styled from "styled-components";

const CarPictureListItem = () => {
  return (
    <Container>
      <ImageContainer>
        <Image src="/path/to/your/image.png" alt="Car" />
      </ImageContainer>
      <InfoContainer>
        <TextContainer>
          <Name>전상현</Name>
          <Description>벤츠 GLS 600 4MATIC MANUFAKTUR 2024</Description>
        </TextContainer>
        <Likes>1019</Likes>
      </InfoContainer>
    </Container>
  );
};

export default CarPictureListItem;

const Container = styled.div`
  width: 260px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
  width: 100%;
  padding-top: 75%; /* Aspect Ratio 4:3 */
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

const Likes = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  color: gray;
  margin-bottom: auto;
`;

const Icon = styled.span`
  margin-right: 5px;
  font-size: 14px;
`;
