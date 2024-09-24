import React, { useCallback, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { fetchVote, addVote } from '@/api/channel';
import { Option } from '@/types/channelType';
import { useAuthStore } from "@/store/authStore";
import LoginForm from "@/components/login/LoginForm";
import { useRouter } from "next/navigation";

interface VoteProps {
  voteId: string;
  onOptionsCheck: (hasOptions: boolean) => void;
}

interface PollOption {
  orderId: number;
  text: string;
  votes: number;
  percentage?: number;
  id: string;
}

const PollComponent: React.FC<VoteProps> = ({ voteId, onOptionsCheck }) => {
  const router = useRouter();

  const [voteData, setVoteData] = useState<PollOption[]>([]);
  const [question, setQuestion] = useState<string>('');
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const { isLoggedIn } = useAuthStore();

  const loadVoteData = useCallback(async () => {
    try {
      const data = await fetchVote(voteId);

      const totalVotes = data.options.reduce((sum: number, option: Option) => sum + option.voteCount, 0);
      const transformedData: PollOption[] = data.options.map((option: Option) => ({
        orderId: option.optionOrder,
        text: option.content,
        votes: option.voteCount,
        percentage: totalVotes ? Math.round((option.voteCount / totalVotes) * 100) : 0,
        id: option.id
      }));

      onOptionsCheck(data.options && data.options.length > 0);

      setVoteData(transformedData);
      setQuestion('누가누가 잘못했을까요');
      setHasVoted(data.hasVoted);
      setSelectedOptionId(data.selectedOptionId);
    } catch (error) {
      console.error('Failed to load vote data:', error);
    }
  }, [voteId]);

  useEffect(() => {
    loadVoteData();
  }, [loadVoteData]);

  const handleVote = async (orderId: number, optionId: string) => {
    if (!isLoggedIn) {
      setShowLogin(true);
      return;
    }

    if (!hasVoted) {
      const updatedData = voteData.map(option =>
        option.orderId === orderId ? { ...option, votes: option.votes + 1 } : option
      );

      const totalVotes = updatedData.reduce((sum, option) => sum + option.votes, 0);
      const updatedDataWithPercentage = updatedData.map(option => ({
        ...option,
        percentage: Math.round((option.votes / totalVotes) * 100),
      }));

      setVoteData(updatedDataWithPercentage);
      setHasVoted(true);
      setSelectedOptionId(optionId);

      try {
        const voteSuccess = await addVote(voteId, optionId);
        if (!voteSuccess) {
          console.error('Failed to register vote');
        }
      } catch (error) {
        console.error('Error while voting:', error);
      }
    }
  };

  const closePopup = () => {
    setShowLogin(false);
    router.back();
  };

  if (voteData.length === 0) {
    return null;
  }

  return (
    <>
      <Container>
        <Question>{question}</Question>
        <Options>
          {voteData.map((option) => (
            <OptionItem
              key={option.orderId}
              onClick={() => handleVote(option.orderId, option.id)}
              data-isselected={option.id === selectedOptionId}
              data-hasvoted={hasVoted}
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
      {showLogin && (
        <ModalOverlay onClick={closePopup}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <LoginForm closeLoginModal={closePopup} />
            <CloseIcon onClick={closePopup}>×</CloseIcon>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Container = styled.div`
  padding: 10px 20px 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
`;

const Question = styled.h2`
  font-size: 21px;
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

const OptionItem = styled.div.attrs<{ percentage: number }>(
  ({ percentage }) => ({
    percentage,
  })
) <{ percentage: number }>`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: ${(props) => (props['data-hasvoted'] ? 'default' : 'pointer')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;


  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: ${(props) => (props['data-isselected'] ? '#ff8e5a' : '#ddd')};
    width: ${(props) => (props['data-hasvoted'] ? `${props.percentage}%` : 0)};
    animation: ${(props) => (props['data-hasvoted'] ? grow(props.percentage) : 'none')} 1s forwards;
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

const VotePercentage = styled.span`
  font-size: 0.8em;
  color: #999;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 2em;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  max-width: 50%;
  width: 100%;
  animation: ${fadeIn} 300ms ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 300ms ease-in-out;
  }
`;

export default PollComponent;
