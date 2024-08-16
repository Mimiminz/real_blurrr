import React from 'react';
import styled from 'styled-components';

interface NotificationsProps {
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onClose }) => {
  return (
    <NotificationContainer>
      <CloseButton onClick={onClose}>X</CloseButton>
      <p>알림 내용입니다.</p>
    </NotificationContainer>
  );
};

export default Notifications;

const NotificationContainer = styled.div`
  position: fixed;
  top: 6%;
  right: 8%;
  padding: 1em;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-size: 1.0em;
  cursor: pointer;
  color: #333;
  &:hover {
    color: red;
  }
`;
