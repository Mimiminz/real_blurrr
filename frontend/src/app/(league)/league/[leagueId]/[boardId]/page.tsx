"use client";

import styled from "styled-components";
import Breadcrumb from "@/components/common/UI/BreadCrumb";
import Comment from "@/components/common/UI/comment/Comment";
import Reply from "@/components/common/UI/comment/Reply";
import CreateComment from "@/components/common/UI/comment/CreateComment";
import LeagueDetailTitle from "@/components/league/detail/LeagueDetailTitle";
import { Divider } from "@nextui-org/divider";
import { LiaCommentDots } from "react-icons/lia";

const boardDetail = () => (
  <>
    <BreadcrumbContainer>
      <Breadcrumb channel="리그" subChannel="GV70 리그" channelUrl="/league" />
    </BreadcrumbContainer>
    <LeagueDetailTitle
      title="오늘 현대 GV70 샀다 질문 받는다..."
      date="2024.07.17"
      views={1019}
      likes={142}
      username="전상현"
      avatarUrl="https://i.pravatar.cc/30"
      authorCarInfo="벤츠 GLS 600 4MATIC MANUFAKTUR 2024"
    />
    <Divider />
    <Content>
      지난주말에 장인어른이 당한 사고 내용입니다 접합 차량과 같은방향으로
      진행중에 가해 차량이 후진을 해서 급브레이크로 경고 했지만 그대로
      박았습니다. 블박영상에는 충격이 전해지지만는데, 원본영상에서는 흔들리는
      영상이 있습니다(원본은 아직 못올렸네요) 장마철 사고이기도해서 그냥
      넘어가려고 했는데 내리자마자 "안박았다 왜그러냐" 란 식이었습니다 사과하면
      그냥 넘어가려고 했으나 이렇게 무시를 하니가 "그럼 미안한데 블박보죠"
      했다는데요. 바쁨바쁜 우선 연락처만 받고 자리에 이동하였고 장인어른이
      이런상황이면 어쩌할줄 재서 거세게 차주분과 제가 연락을 해보았는데
      엄한무인이라고요
    </Content>
    <Divider />
    <CommentContainer>
      <CommentNumber>
        <LiaCommentDots />8
      </CommentNumber>
      <CreateComment />
      <Comment
        avatarUrl="https://i.pravatar.cc/30"
        userName="돌판"
        userDetail="BMW M8"
        text="무과실이 맞는데 아무래도 과실 몰릴것 같네요.dfawefawtfawerfawv eravwrwaerwaetferwavfwervawbawrnsrysebrtaeawegrawgawgrgedgawsrg."
        time="23h"
      />
      <Reply
        avatarUrl="https://i.pravatar.cc/30"
        userName="해결사요"
        userDetail="BMW M8"
        text="무과실이 맞는데 아무래도 과실 몰릴것 같네요."
        time="6h"
      />
    </CommentContainer>
  </>
);

export default boardDetail;

const BreadcrumbContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 17px;
  line-height: 1.5;
  color: #333;
  padding: 20px;
  padding-bottom: 50px;
`;

const CommentNumber = styled.div`
  svg {
    margin-right: 5px;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;
