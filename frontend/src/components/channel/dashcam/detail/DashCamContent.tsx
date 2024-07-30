import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { DashCamContentData } from '@/types/channelType';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-bottom: 30px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 10px;
  margin-bottom: 16px;
  padding : 5px 28px;
`;

const Title = styled.div`
   padding : 0px 28px;
   border-bottom: 1px solid #e0e0e0;
`

const Body = styled.div`
   padding : 0px 28px;
`

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.div`
  font-weight: bold;
`;

const CarInfo = styled.div`
  color: #666;
  font-size: 14px;
  margin-top: 4px;
`;

const Date = styled.div`
  font-size: 14px;
  color: #999;
`;

const Tags = styled.div`
  margin-bottom: 16px;
`;

const Tag = styled.span`
  background-color: #ddd;
  border-radius: 9px;
  padding: 4px 8px;
  margin-right: 8px;
  font-size: 12px;
`;

const VideoContainer = styled.div`
  width: 100%;

  video {
    width: 100%;
    height: 100%;
  }
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  border-top: 1px solid #e0e0e0;
  padding-top: 15px;
`;

const HeartButton = styled.button`
  margin: 5px 1px 5px auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 22px;
  color: #666;
  display: flex;
  justify-content: flex-end;

  &:hover {
    color: #666;
  }
`;

const DashCamContent: React.FC<DashCamContentData> = ({
   id, member, title, createdAt, videoUrl, content, mentionedLeagues
}) => {
   const [isLiked, setIsLiked] = useState(false);

   const toggleLike = () => {
      setIsLiked(!isLiked);
   };

   return (
      <Container>
         <Title>
            <h2>{title}</h2>
         </Title>
         <Header>
            <User>
               <Avatar />
               <UserInfo>
                  <Username>{member.nickname}</Username>
                  <CarInfo>{member.carTitle}</CarInfo>
               </UserInfo>
            </User>
            <Date>{createdAt}</Date>
         </Header>
         <Body>
            <Tags>
               {mentionedLeagues.map((league =>
                  <Tag key={league.id}>{league.name}</Tag>
               ))}
            </Tags>
            <VideoContainer>
               <video controls autoPlay loop>
                  <source src={videoUrl[0]} type="video/mp4" />
               </video>
            </VideoContainer>
            <HeartButton onClick={toggleLike}>
               {isLiked ? <FaHeart /> : <FaRegHeart />}
            </HeartButton>
            <Content>
               {content}
            </Content>
         </Body>
      </Container>
   );
};

export default DashCamContent;
