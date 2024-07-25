import React from 'react'
import styled from 'styled-components';

type Props = {}

const Withdrawal = (props: Props) => {
  return (
    <Container>
        <Title> 탈퇴 안내 😥 </Title>
        <SubTitle> 아래 유의사항을 꼼꼼히 읽어주세요. </SubTitle>
        <InfoBox>
            <SubSubTitle>1. 계정 탈퇴 시, blurrr 서비스에서 탈퇴됩니다. </SubSubTitle>
            <SubSubTitle>2. 탈퇴 시 계정과 관련된 모든 권한이 사라지며 복구할 수 없습니다. </SubSubTitle>
            <SubSubTitle>3. 직접 작성한 콘텐츠(동영상, 게시물, 댓글 등)는 자동으로 삭제되지 않으며, 만일 삭제를 원하시면 탈퇴 이전에 삭제가 필요합니다.</SubSubTitle>
            <SubSubTitle>4.탈퇴 후 동일한 메일로 재가입이 가능하나, 탈퇴한 계정과 연동되지 않습니다.</SubSubTitle>
        </InfoBox>
        
        <Button>
                네 즐거웠어요.
        </Button>
    </Container>
  )
}

export default Withdrawal

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 600px;
gap:5px;
`;


const Title = styled.h1`
  text-align: center;
  margin-bottom: 0.5em;
`;

const SubTitle = styled.h2`
  margin: 5px 0;
`;

const SubSubTitle = styled.h4`
  margin: 5px 0;
`;

const InfoBox = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    background-color: #e7e7e7;
    padding: 10px;
    border-radius: 5px;
`

const Button = styled.button`
  width: 200px;
  padding: 0.7em;
  margin-top: 0.5em;
  font-size: 1em;
  color: #fff;
  background-color: #f9803a;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #ff5e01;
  }

  &:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
`;