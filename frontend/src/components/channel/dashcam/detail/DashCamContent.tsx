import React from 'react';
import styled from 'styled-components';
import { Divider } from "@nextui-org/divider";

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
  align-items: center;
  margin-bottom: 16px;
  padding : 5px 28px;
`;

const Body = styled.div`
   padding : 0px 28px;
`

const User = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;  // 수정된 크기
  height: 40px; // 수정된 크기
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
  margin-bottom: 16px;

  video{
   width: 100%;
   height: 100%;
  }
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
`;

const DashCamContent: React.FC = () => {
   return (
      <Container>
         <Body>
            <h2>과실 비율이 어떻게 되나요?</h2>
         </Body>
         <Divider />
         <Header>
            <User>
               <Avatar />
               <UserInfo>
                  <Username>blurrr</Username>
                  <CarInfo>벤츠 GLS 600 4MATIC MANUFAKTUR 2024</CarInfo>
               </UserInfo>
            </User>
            <Date>2024.07.17</Date>
         </Header>
         <Body>
            <Tags>
               <Tag>#현대</Tag>
               <Tag>#제네시스</Tag>
               <Tag>#기아</Tag>
            </Tags>
            <VideoContainer>
               <video controls autoPlay loop>
                  <source src="/images/example_video.mp4" type="video/mp4" />
               </video>
            </VideoContainer>
            <Content>
               지난주말에 장인어른이 당한 사고 내용입니다
               접합 차량과 같은방향으로 진행중에 가해 차량이 후진을 해서 급브레이크로 경고 했지만
               그대로 박았습니다. 블박영상에는 충격이 전해지지만는데, 원본영상에서는 흔들리는 영상이 있습니다(원본은 아직 못올렸네요)

               장마철 사고이기도해서 그냥 넘어가려고 했는데 내리자마자 "안박았다 왜그러냐" 란 식이었습니다
               사과하면 그냥 넘어가려고 했으나 이렇게 무시를 하니가
               "그럼 미안한데 블박보죠" 했다는데요.

               바쁨바쁜 우선 연락처만 받고 자리에 이동하였고 장인어른이 이런상황이면 어쩌할줄 재서 거세게 차주분과 제가 연락을 해보았는데 엄한무인이라고요
            </Content>
         </Body>
      </Container>
   );
};

export default DashCamContent;
