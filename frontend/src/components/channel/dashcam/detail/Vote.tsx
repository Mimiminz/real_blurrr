import React, { useCallback, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { fetchVote } from '@/api/channel';
import { Option } from '@/types/channelType';

interface VoteProps {
  voteId: string;
}

interface PollOption {
  id: number;
  text: string;
  votes: number;
  percentage?: number;
}

const PollComponent: React.FC<VoteProps> = ({ voteId }) => {
  const [voteData, setVoteData] = useState<PollOption[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);

  const loadVoteData = useCallback(async () => {
    try {
      const data = await fetchVote(voteId); // API 호출

      const transformedData: PollOption[] = data.options.map((option: Option) => ({
        id: option.optionOrder,
        text: option.content,
        votes: option.voteCount,
      }));

      setVoteData(transformedData);
      setQuestion('누가누가 잘못했을까요'); // 질문을 여기에 설정하세요
      setHasVoted(data.hasVoted);
    } catch (error) {
      console.error('Failed to load vote data:', error);
    }
  }, [voteId]);

  useEffect(() => {
    loadVoteData();
  }, [loadVoteData]);

  const handleVote = (optionId: number) => {
    if (!hasVoted) {
      const updatedData = voteData.map(option =>
        option.id === optionId ? { ...option, votes: option.votes + 1 } : option
      );

      const totalVotes = updatedData.reduce((sum, option) => sum + option.votes, 0);
      const updatedDataWithPercentage = updatedData.map(option => ({
        ...option,
        percentage: Math.round((option.votes / totalVotes) * 100),
      }));

      setVoteData(updatedDataWithPercentage);
      setHasVoted(true);
      setSelectedOptionId(optionId);

      // 여기에 실제 API 호출을 추가하여 투표 결과를 서버에 전송하세요.
      console.log(`Voted for option ${optionId}`);
    }
  };

  return (
    <Container>
      <Question>{question}</Question>
      <Options>
        {voteData.map((option) => (
          <OptionItem
            key={option.id}
            onClick={() => handleVote(option.id)}
            $isSelected={option.id === selectedOptionId}
            $hasVoted={hasVoted}
            percentage={option.percentage || 0}
          >
            <OptionText>{option.text}</OptionText>
            {hasVoted && (
              <VoteInfo>
                <VotePercentage>{option.percentage}%</VotePercentage>
              </VoteInfo>
            )}
          </OptionItem>
        ))}
      </Options>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

const Question = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
`;

const grow = (percentage: number) => keyframes`
  from {
    width: 0;
  }
  to {
    width: ${percentage}%;
  }
`;

const OptionItem = styled.div.attrs<{ $isSelected: boolean; $hasVoted: boolean; percentage: number }>(
  ({ $isSelected, $hasVoted, percentage }) => ({
    isSelected: $isSelected,
    hasVoted: $hasVoted,
    percentage,
  })
) <{ $isSelected: boolean; $hasVoted: boolean; percentage: number }>`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: ${(props) => (props.$hasVoted ? 'default' : 'pointer')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;

  /* &:hover {
    background-color: ${(props) => (props.$hasVoted ? (props.$isSelected ? '#00B87B' : '#fff') : '#f0f0f0')};
  } */

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: ${(props) => (props.$isSelected ? '#ff8e5a' : '#ddd')};
    width: ${(props) => (props.$hasVoted ? props.percentage : 0)}%;
    animation: ${(props) => (props.$hasVoted ? grow(props.percentage) : 'none')} 1s forwards;
  }
`;

const OptionText = styled.span`
  font-weight: bold;
  z-index: 1;
`;

const VoteInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 1;
`;

const VoteCount = styled.span`
  font-size: 0.9em;
  color: #666;
`;

const VotePercentage = styled.span`
  font-size: 0.8em;
  color: #999;
`;

export default PollComponent;
