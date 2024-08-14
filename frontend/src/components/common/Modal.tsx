import React from "react";
import styled, { keyframes } from "styled-components";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps): JSX.Element => {
  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
        <CloseButton onClick={onClose}>×</CloseButton>
      </ModalContent>
</ModalOverlay>
  );
};

export default Modal;

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 90%;
  max-width: 500px;
  padding: 10px;
  overflow: hidden;
  animation: ${fadeIn} 300ms ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 300ms ease-in-out;
  }

  @media (min-width: 480px) {
    width: 100%;
    height: 600px;
    padding: 15px;
  }

  @media (min-width: 768px) {
    width: 90%;
    height: 700px;
    padding: 10px;
  }

  @media (min-width: 1024px) {
    width: 90%;
    height: 700px;
    padding: 10px;
  }

  @media (min-width: 1440px) {
    width: 90%;
    height: 700px;
    padding: 10px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
`;
