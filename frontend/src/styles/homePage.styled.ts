import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row;
    border-top: none;
    width: 100%;
  }
`;

export const GridContainer = styled.div`
  display: flex;
  width: 100%;

  @media (min-width: 1024px) {
    flex-direction: row;
    border-top: none;
    width: 100%;
  }
`;

export const Main = styled.main`
  padding: 10px;
  width: 100%;

  @media (min-width: 1024px) {
    width: 70%;
  }
`;

export const Aside = styled.aside`
  display: none;

  @media (min-width: 1024px) {
    display: block;
    width: 300px;
    margin-left: 64px;
  }
`;

export const SectionTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 6px;
  display: flex;
  align-items: end;

  svg {
    margin-right: 5px;
  }
`;

export const ArticleSection = styled.div`
  margin-bottom: 40px;

  @media (min-width: 768px) {
    margin: 0 20px 50px;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AsideSection = styled.div`
  padding: 16px 24px;
  margin: 20px 0px;
  background-color: #f7f8f9;
  border-radius: 8px;
  align-items: center;
`;

export const AsideSectionTitle = styled.h2`
  font-size: 16px;
  margin-top: 2px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;

  &.today {
    svg {
      color: #fbc02d;
    }
  }

  svg {
    margin-right: 5px;
  }
`;

export const UserInfoContainer = styled.div`
  margin: 10px 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 768px) {
    margin: 40px 0;
  }
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: gray;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 4px;
  }

  @media (min-width: 1024px) {
    font-size: 13px;
  }
`;

export const NoAuth = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 28px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin-left: 10px;

  @media (min-width: 480px) {
    width: 70%;
  }

  @media (min-width: 768px) {
    margin-right: 30px;
    width: 48%;
  }

  @media (min-width: 1024px) {
    width: 50%;
  }

  @media (min-width: 1440px) {
    width: 70%;
    padding: 28px 20px;
  }
`;

export const NoAuthTitle = styled.h3`
  width: 70%;
  font-size: 16px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

export const CarCerficationButton = styled.button`
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 10px 10px;
  width: 60%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    margin-right: 5px;
  }
`;

export const TitleDescription = styled.p`
  font-size: 12px;
  font-weight: normal;
  color: #6f6f6f;
  margin: 0;
  margin-left: 7px;
  margin-bottom: 1px;
`;

export const Title = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 5px;
  }
`;
