import styled from "styled-components";

import dummy from "@/db/leaguechannelData.json";
import ChannelBoardListItem from "@/components/channel/board/ChannelBoardListItem";

const ChannelBoardList = () => {
  return (
    <ChannelList>
        {dummy.Lists.map((lst,index) => (
            <ChannelBoardListItem
                key={index}
                mentions={lst.mentions}
                title={lst.title}
                texts={lst.texts}
                writer={lst.writer}
                writertag={lst.writertag}
                times={lst.times}
                likes={lst.likes}
                comments={lst.comments}
            />
        ))}
        
    </ChannelList>
  );
};
const ChannelList = styled.div``;

export default ChannelBoardList;
