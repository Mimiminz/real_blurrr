import styled from "styled-components";
import { useRouter } from "next/navigation";
import LeagueBoardListItem from "./LeagueBoardListItem";

import { fetchLeagueBoardList } from "@/api/league";
import { useEffect, useState } from "react";
import {  LeagueBoardItem } from "@/types/league";

interface boardListProp {
  leagueId: string;
}

const LeagueBoardList = ({ leagueId }: boardListProp) => {
  const router = useRouter();
  const [boardList, setBoardList] = useState<LeagueBoardItem[]>([]);

  const handleCardClick = (id: string) => {
    router.push(`league/${leagueId}/${id}`);
  };
  useEffect(() => {
    const loadBoardData = async () => {
      try {
        const boardData = await fetchLeagueBoardList(leagueId);
        setBoardList(boardData);
      } catch (error) {
        console.error("Failed to fetch board data", error);
      }
    };

    loadBoardData();
  }, [leagueId]);

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
