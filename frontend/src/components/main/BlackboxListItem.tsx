import React from "react";
import styled from "styled-components";

interface blackboxArticle {
  title: string;
  totalVotes: number;
  optionA: number;
  optionB: number;
}

function BlackboxListItem({
  title,
  totalVotes,
  optionA,
  optionB,
}: blackboxArticle) {
  const percentageA = parseFloat(((optionA / totalVotes) * 100).toFixed(1));
  const percentageB = parseFloat(((optionB / totalVotes) * 100).toFixed(1));

  const largerPercentage =
    percentageA > percentageB ? percentageA : percentageB;

  return (
    <Container>
      <ArticleInfo>
        <Title>{title}</Title>
        <Participants>{totalVotes}명 참여</Participants>
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
}

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
`;
