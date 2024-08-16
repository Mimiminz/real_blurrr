import styled from 'styled-components';

export const SectionTitle = styled.h3`
  margin-top: 40px;
  margin-bottom: 25px;
`;

export const SearchBarContainer = styled.div`
  justify-content: flex-start;
  width: 100%;
  margin: 10px 0px 30px;
`;

export const PageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 320px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
  @media (min-width: 480px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(200px, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(200px, 1fr));
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, minmax(200px, 1fr));
  }
  @media (min-width: 2560px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

export const EmptyMessage = styled.p`
  padding-top: 100px;
  text-align: center;
  font-size: 18px;
  color: #333;
`;
