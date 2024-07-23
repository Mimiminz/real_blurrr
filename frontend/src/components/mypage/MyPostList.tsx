import React from 'react'
import styled from 'styled-components';

const MyPostList = () => {
  return (
    <Container>
        <Title>내 게시글 목록 (5)</Title>
    </Container>
  )
}

export default MyPostList

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 600px;
`;

const Title = styled.h2`
  font-weight: bold;
  margin-bottom: 0.5em;
`;
