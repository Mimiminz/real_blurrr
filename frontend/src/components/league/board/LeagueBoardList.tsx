import styled from "styled-components";

import dummy from "@/db/leaguechannelData.json";
import ChannelBoardListItem from "@/components/channel/board/ChannelBoardListItem";
import LeagueBoardListItem from "./LeagueBoardListItem";

const LeagueBoardList = () => {
  return (
    <BoardList>
      {dummy.Leagues.map((lst, index) => (
        <LeagueBoardListItem
          key={index}
          title={lst.title}
          writer={lst.writer}
          writertag={lst.writertag}
          times={lst.times}
          likes={lst.likes}
          comments={lst.comments}
        />
      ))}
    </BoardList>
  );
};
const BoardList = styled.div``;

export default LeagueBoardList;
