import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { HotBoardItem } from "@/types/mainPageTypes";
import { useRouter } from "next/navigation";
import { useChannelStore } from "@/store/channelStore";

function HotArticleListItem({
  id,
  channel,
  title,
  likeCount,
  commentCount,
}: HotBoardItem) {
  const router = useRouter();

  const { setChannelName, setChannelId, channelName, channelId } =
    useChannelStore();

  const handleClick = () => {
    setChannelId(channel.id);

    if (channel.id === process.env.NEXT_PUBLIC_DASHCAM_ID) {
      setChannelName("블랙박스");
      router.push(`/channels/dashcam/${id}`);
    } else if (channel.id === process.env.NEXT_PUBLIC_BOAST_ID) {
      setChannelName("차자랑");
    } else {
      setChannelName(channel.name);
    }
    router.push(`/channels/${channel.id}/${id}`);
  };
  return (
    <ArticleDetail onClick={handleClick}>
      <ArticleInfo>
        <Channel>{channel.name}</Channel>
        <Title>
          {title.slice(0, 12)}
          {title.length > 12 && " ..."}
        </Title>
      </ArticleInfo>
      <LikeAndComment>
        <LikeSection>
          <FaRegHeart />
          {likeCount}
        </LikeSection>
        <LikeSection>
          <FaRegComment />
          {commentCount}
        </LikeSection>
      </LikeAndComment>
    </ArticleDetail>
  );
}

const ArticleDetail = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
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

const Channel = styled.p`
  color: ${({ theme }) => theme.colors.main};
  margin-bottom: 4px;
  margin-top: 3px;
  font-size: 12px;
`;

const Title = styled.p`
  color: black;
  font-size: 14px;
  margin: 0;
  margin-bottom: 3px;
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const LikeSection = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 4px;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 12px;

  svg {
    margin-right: 4px;
  }
`;

export default HotArticleListItem;
