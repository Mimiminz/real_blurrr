import styled from "styled-components";
import { FaRegHeart } from "react-icons/fa6";
import { LiaCommentDots } from "react-icons/lia";
import { HotBoardItem } from "@/types/mainPageTypes";
import { useRouter } from "next/navigation";

function HotArticleListItem({
  id,
  channel,
  title,
  likeCount,
  commentCount,
}: HotBoardItem) {
  const router = useRouter();

  const handleClick = () => {
    if (channel.id === process.env.NEXT_PUBLIC_DASHCAM_ID) {
      router.push(`/channels/dashcam/${id}`);
    } else {
      router.push(`/channels/${channel.id}/${id}`);
    }
  };
  return (
    <ArticleDetail onClick={handleClick}>
      <ArticleInfo>
        <Channel>{channel.name}</Channel>
        <Title>{title}</Title>
      </ArticleInfo>
      <LikeAndComment>
        <LikeSection>
          <Icon>
            <FaRegHeart />
          </Icon>
          {likeCount}
        </LikeSection>
        <LikeSection>
          <Icon>
            <LiaCommentDots />
          </Icon>
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
  padding: 10px;
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
  margin-bottom: 8px;
  margin-top: 10px;
  font-size: 12px;
`;

const Title = styled.p`
  color: black;
  font-size: 16px;
  margin: 0;
  margin-bottom: 8px;
`;

const LikeAndComment = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
`;

const LikeSection = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 8px;
  margin-top: auto;
  color: ${({ theme }) => theme.colors.subDiscription};
  font-size: 14px; /* 아이콘과 텍스트 크기 조정 */
`;

const Icon = styled.span`
  margin-right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px; /* 아이콘 크기 조정 */
  vertical-align: middle;
`;
export default HotArticleListItem;
