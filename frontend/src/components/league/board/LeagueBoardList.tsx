import styled from "styled-components";
import { useRouter } from "next/navigation";
import LeagueBoardListItem from "./LeagueBoardListItem";

import { fetchLeagueBoardList } from "@/api/league";
import { useEffect, useState } from "react";
import { boardListProp, LeagueBoardItem } from "@/types/league";

const LeagueBoardList = ({ leagueId, criteria }: boardListProp) => {
  const router = useRouter();
  const [boardList, setBoardList] = useState<LeagueBoardItem[]>([]);

  useEffect(() => {
    const loadBoardData = async () => {
      try {
        const boardData = await fetchLeagueBoardList(leagueId, criteria);
        setBoardList(boardData);
      } catch (error) {
        console.error("Failed to fetch board data", error);
      }
    };

    loadBoardData();
  }, [leagueId, criteria]);

  const handleCardClick = (id: string) => {
    router.push(`league/${leagueId}/${id}`);
  };

  return (
    <BoardList>
      {boardList.map((item) => (
        <div key={item.id} onClick={() => handleCardClick(item.id)}>
          <LeagueBoardListItem
            key={item.id}
            title={item.title}
            writer={item.member.nickname}
            writerCar={item.member.carTitle}
            createdAt={item.createdAt}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
          />
        </div>
      ))}
    </BoardList>
  );
};
const BoardList = styled.div``;

export default LeagueBoardList;
