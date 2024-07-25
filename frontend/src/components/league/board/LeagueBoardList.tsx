import styled from "styled-components";
import { useRouter } from "next/navigation";
import dummy from "@/db/leaguechannelData.json";
import LeagueBoardListItem from "./LeagueBoardListItem";

interface boardListProp {
  leagueId: string;
}

const LeagueBoardList = ({ leagueId }: boardListProp) => {
  const router = useRouter();
  const handleCardClick = (id: number) => {
    router.push(`league/${leagueId}/${id}`);
  };
  return (
    <BoardList>
      {dummy.Leagues.map((lst, index) => (
        <div key={index} onClick={() => handleCardClick(lst.id)}>
          <LeagueBoardListItem
            key={index}
            title={lst.title}
            writer={lst.writer}
            writertag={lst.writertag}
            times={lst.times}
            likes={lst.likes}
            comments={lst.comments}
          />
        </div>
      ))}
    </BoardList>
  );
};
const BoardList = styled.div``;

export default LeagueBoardList;
