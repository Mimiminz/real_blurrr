import styled from "styled-components";
import CarPictureListItem from "./CarPictureListItem";

const CarPictureList = () => {
  return (
    <ArticleList>
      <CarPictureListItem />
      <CarPictureListItem />
      <CarPictureListItem />
    </ArticleList>
  );
};

const ArticleList = styled.div`
  display: flex;
  flex-direction: row;
`;

export default CarPictureList;
