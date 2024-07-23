import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
    
        <FooterContent>
          <FooterText>본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.</FooterText>
          <FooterText>© 2024 blurrr. All rights reserved.</FooterText>
        </FooterContent>
    
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: #d16d34 ;
  color: #fff;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  gap:20px;
  width: 80%;
  max-width: 1200px;
  flex-wrap: wrap;
`;

const FooterText = styled.p`
  margin: 0;
`;


//추가 링크 작성 시 사용
const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
