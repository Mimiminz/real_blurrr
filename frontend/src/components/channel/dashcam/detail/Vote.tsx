import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 16px 30px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Question = styled.h3`
  font-size: 16px;
  margin-bottom: 16px;
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const RadioButton = styled.input`
  margin-right: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #333;
  flex: 1;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled.div<{ percentage: number }>`
  width: ${({ percentage }) => percentage}%;
  height: 100%;
  background-color: #4caf50;
`;

const Percentage = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 8px;
`;

const Vote: React.FC = () => {
   const [votes, setVotes] = useState({ a: 33, b: 67 });

   return (
      <Container>
         <Question>누가 잘못했나요?</Question>
         <Option>
            <RadioButton type="radio" name="vote" />
            <Label>A 차량</Label>
            <ProgressBarContainer>
               <ProgressBar percentage={votes.a} />
            </ProgressBarContainer>
            <Percentage>{votes.a}%</Percentage>
         </Option>
         <Option>
            <RadioButton type="radio" name="vote" />
            <Label>B 차량</Label>
            <ProgressBarContainer>
               <ProgressBar percentage={votes.b} />
            </ProgressBarContainer>
            <Percentage>{votes.b}%</Percentage>
         </Option>
      </Container>
   );
};

export default Vote;
