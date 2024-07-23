import React from 'react'
import styled from 'styled-components'

const MyHeartList = () => {
  return (
    <Container>
        <Title>내 좋아요 목록 (5)</Title>
    </Container>
  )
}

export default MyHeartList

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
