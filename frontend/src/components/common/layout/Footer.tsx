import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterRow>
          <FooterSection>
            <FooterTitle>이용안내</FooterTitle>
            <FooterText>
              본 사이트는 자동차 관련 익명 커뮤니티입니다. <br />
              자동차 등록증 등의 개인 정보를 저장하거나 수집하지 않습니다.
            </FooterText>
          </FooterSection>
          <FooterSection>
            <FooterTitle>피드백</FooterTitle>
            <FooterText>사이트 개선을 위한 피드백을 남겨주세요.</FooterText>
            <FooterLink
              href="https://docs.google.com/forms/d/e/1FAIpQLScdAcpBDfjAAkM3ZocGCtMqPNPhKHpm1sKl0EvRErOosuXa6g/viewform?usp=sf_link"
              target="_blank"
            >
              피드백 제출하기
            </FooterLink>
          </FooterSection>
          <FooterSection>
            <FooterTitle>서비스정보</FooterTitle>
            <FooterText>주소: 서울 강남구 선릉로 428</FooterText>
            <FooterText>이메일: teamluckyvickyblurrr@gmail.com</FooterText>
          </FooterSection>
        </FooterRow>
        <Divider />
        <FooterRow>
          <FooterSection>
            <FooterText>
              본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사,
              배포 등을 금합니다.
            </FooterText>
            <FooterText>© 2024 blurrr. All rights reserved.</FooterText>
          </FooterSection>
        </FooterRow>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d16d34;
  color: #fff;
  padding: 20px 0;
  height: auto;
  margin-top: 50px;
`;

const FooterContent = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 40px;
  }
`;

const Divider = styled.div`
  border-top: 2px solid #fff;
  opacity: 40%;
  margin: 25px 0px 20px 0px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const FooterTitle = styled.h4`
  margin: 0;
  font-size: 1.2em;
  color: #fff;

  @media (max-width: 768px) {
    font-size: 1.1em;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 0.9em;

  @media (max-width: 768px) {
    font-size: 0.85em;
  }
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: underline;
  font-size: 0.9em;
  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.85em;
  }
`;
