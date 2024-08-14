import { useChannelStore } from "@/store/channelStore";
import { useRouter } from "next/navigation";
import React from "react";
import styled from "styled-components";

interface option {
  voteCount: number;
  percentage?: number;
}

interface blackboxArticle {
  id: string;
  title: string;
  totalVotes: number;
  optionNumber: number;
  options: option[];
}

function BlackboxListItem({
  id,
  title,
  totalVotes,
  optionNumber,
  options,
}: blackboxArticle) {
  const router = useRouter();
  const optionPercentage = options.map((option) => ({
    ...option,
    percentage: Math.round((option.voteCount / totalVotes) * 100),
  }));

  if (!optionPercentage) {
    return <div>loading...</div>;
  }

  // 옵션 퍼센티지에 따라 색상을 설정합니다.
  const sortedOptions = [...optionPercentage].sort(
    (a, b) => b.percentage! - a.percentage!
  );
  const colors =
    optionNumber === 2
      ? ["#FF900D", "#FFCC80"]
      : ["#FF900D", "#FFCC80", "#FFF3E0"];

  // 원래 순서대로 색상을 매핑합니다.
  const coloredOptions = optionPercentage.map((option) => {
    const index = sortedOptions.findIndex(
      (sortedOption) => sortedOption === option
    );
    return {
      ...option,
      color: colors[index],
    };
  });

  const { setChannelName, setChannelId, channelName, channelId } =
    useChannelStore();

  const handleClick = () => {
    setChannelName("블랙박스");
    router.push(`/channels/dashcam/${id}`);
  };

  return (
    <Container onClick={handleClick}>
      <ArticleInfo>
        <Title>
          {title.slice(0, 5)}
          {title.length > 5 && " ..."}
        </Title>
        <Participants>{totalVotes}명 참여</Participants>
      </ArticleInfo>
      {optionNumber > 0 && totalVotes > 0 && (
        <BarContainer>
          {coloredOptions.map((option, index) => (
            <Bar key={index} width={option.percentage} color={option.color}>
              {option.percentage}%
            </Bar>
          ))}
        </BarContainer>
      )}
    </Container>
  );
}

export default BlackboxListItem;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  /* width: 100%; */
  border-bottom: 1.6px solid ${({ theme }) => theme.colors.articleDivider};
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const ArticleInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 15px;
  margin: 0;
  margin: 3px 0 4px;
`;

const Participants = styled.div`
  font-size: 11px;
  color: #5a5959;
  /* margin-bottom: 8px; */
`;

const BarContainer = styled.div`
  display: flex;
  align-items: center;
  height: 20px;
  width: 50%;
  background-color: #fff3e0;
  border-radius: 12px;
  overflow: hidden;
`;

const Bar = styled.div<{ width?: number; color?: string }>`
  height: 100%;
  width: ${(props) => props.width}%;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.color !== "#FF900D" ? "#000" : "#fff")};
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;

  @media (min-width: 768px) {
    font-size: 11px;
  }
`;
