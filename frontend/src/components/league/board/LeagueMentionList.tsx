import styled from "styled-components";
import { useRouter } from "next/navigation";
import LeagueMentionListItem from "./LeagueMEntionListItem";

import { LeagueMentionListProps } from "@/types/leagueTypes";
import { useLeagueStore } from "@/store/leagueStore";

const LeagueMentionBoardList = ({ boardList }: LeagueMentionListProps) => {
  const router = useRouter();

  console.log(boardList);
  const handleCardClick = (id: string, channelId: string) => {
    router.push(`/channels/${channelId}/${id}`);
  };

  return (
    <BoardList>
      {boardList.map((item) => (
        <div
          key={item.id}
          onClick={() => handleCardClick(item.id, item.channel.id)}
        >
          <LeagueMentionListItem
            key={item.id}
            title={item.title}
            writer={item.member.nickname}
            writerCar={item.member.carTitle}
            createdAt={item.createdAt}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            channelName={item.channel.name}
          />
        </div>
      ))}
    </BoardList>
  );
};
const BoardList = styled.div``;

export default LeagueMentionBoardList;
