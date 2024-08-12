import React from "react";
import styled from "styled-components";
import CarPictureCard from "./CarPictureCard";

interface CarPictureListItemProps {
  items: Array<{
    name: string;
    description: string;
    image: string;
    views: number;
  }>;
}

const CarPictureListItem: React.FC<CarPictureListItemProps> = ({ items }) => {
  return (
    <ItemContainer>
      {items.map((item, index) => (
        <CarPictureCard
          key={index}
          id={`${index}`}
          name={item.name}
          description={item.description}
          image={item.image}
          views={item.views}
        />
      ))}
    </ItemContainer>
  );
};

export default CarPictureListItem;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
