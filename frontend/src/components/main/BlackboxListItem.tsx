import React from "react";
import styled from "styled-components";

const BlackboxListItem = () => {
  const totalParticipants = 1000;
  const percentageA = 80;
  const percentageB = 20;

  const largerPercentage =
    percentageA > percentageB ? percentageA : percentageB;

  return (
    <Container>
      <ArticleInfo>
        <Title>제목제목제목제목</Title>
        <Participants>{totalParticipants}명 참여</Participants>
      </ArticleInfo>
      <BarContainer>
        <Bar width={percentageA} larger={percentageA === largerPercentage}>
          {percentageA}%
        </Bar>
        <Bar width={percentageB} larger={percentageB === largerPercentage}>
          {percentageB}%
        </Bar>
      </BarContainer>
    </Container>
  );
};

export default BlackboxListItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-bottom: 1.6px solid ${({ theme }) => theme.colors.articleDivider};
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 18px;
  color: black;
  margin-bottom: 8px;
  margin-top: 12px;
`;

const Participants = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subDiscription};
  margin-bottom: 8px;
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 24px;
  width: 50%;
  background-color: #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
`;

const Bar = styled.div.withConfig({
  shouldForwardProp: (prop) => !["larger"].includes(prop),
})<{ width: number; larger: boolean }>`
  width: ${({ width }) => width}%;
  background-color: ${({ theme, larger }) =>
    larger ? theme.colors.main : "#e0e0e0"};
  color: ${({ theme, larger }) =>
    larger ? "white" : theme.colors.subDescription};
  text-align: center;
  font-size: 12px;
  line-height: 24px;
  border-radius: ${({ width }) => (width > 0 ? "12px 0 0 12px" : "0")};
  margin-right: 5px;
`;

const BarRemaining = styled(Bar).withConfig({
  shouldForwardProp: (prop) => !["larger"].includes(prop),
})<{ width: number; larger: boolean }>`
  border-radius: ${({ width }) => (width > 0 ? "0 12px 12px 0" : "0")};
  margin-left: 5px;
`;
