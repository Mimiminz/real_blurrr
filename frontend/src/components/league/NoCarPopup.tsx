// src/components/Popup.tsx
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";

const NoCarPopup = ({ closePopup }: { closePopup: () => void }) => {
  const router = useRouter();

  const handleGoCarCertification = () => {
    router.push("/carcertification");
  };

  const handleGoChannel = () => {
    router.push("/channels");
  };

  return (
    <PopupContainer onClick={closePopup}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <CloseIcon onClick={closePopup}>×</CloseIcon>
        <Context>인증되지 않은 리그입니다.</Context>
        <Explain>
          해당 자동차를 소유하고 있는 사용자만 글을 볼 수 있습니다. <br />
          채널 게시글은 공개되어 있습니다. <br />
          다양한 주제의 채널을 구경해보세요!
        </Explain>
        <ButtonContainer>
          <CertificationButton onClick={handleGoCarCertification}>
            자동차 등록하기
          </CertificationButton>
          <ChannelButton onClick={handleGoChannel}>
            채널 보러 가기
          </ChannelButton>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  max-width: 400px;
  width: 60%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    padding: 20px;
  }

  animation: ${fadeIn} 300ms ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 300ms ease-in-out;
  }
`;

const CloseIcon = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #333;
  }
`;

const Context = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Explain = styled.p`
  font-size: 16px;
  margin: 10px 0;
  line-height: 1.5;
  color: #666;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  margin: 0 10px;
  padding: 12px 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  transition: background 0.3s;
  color: white;
  /* width: 30%; */
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

const CertificationButton = styled(Button)`
  background: #ff900d;
`;

const ChannelButton = styled(Button)`
  background: #2d2d2d;
`;
export default NoCarPopup;
