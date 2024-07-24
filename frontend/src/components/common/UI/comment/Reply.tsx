import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  margin-left: 20px; /* Adjust the indentation for replies */
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #c4c4c4;
  margin-right: 8px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Username = styled.span`
  font-weight: bold;
  color: #f57c00;
`;

const Text = styled.span`
  font-size: 14px;
  color: #333;
`;

const Time = styled.span`
  font-size: 12px;
  color: #999;
  margin-top: 8px;
`;

const Reply: React.FC = () => {
   return (
      <Container>
         <Avatar />
         <Content>
            <Username>해결사요</Username>
            <Text>픽시자전거이며 브레이크를 밟았는데도 멈추질 못했다고 하네요</Text>
            <Time>6h</Time>
         </Content>
      </Container>
   );
};

export default Reply;
