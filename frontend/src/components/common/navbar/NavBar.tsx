import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Notifications from './Notifications';

const NavBar = () => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const handleNotificationsClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  return (
    <Nav>
      <Image src = '/images/logo/logo.png' onClick={() => router.push('/')}></Image>
      <Menu>
        <MenuItem onClick={() => router.push('/')}>Home</MenuItem>
        <MenuItem onClick={() => router.push('/league')}>리그</MenuItem>
        <MenuItem onClick={() => router.push('/channels')}>채널</MenuItem>
        <IoMdNotifications onClick={() => router.push('/notifications')} />
        <MenuItem onClick={() => router.push('/login')}>로그인</MenuItem>
        <MenuItem onClick={() => router.push('/signup')}>회원가입</MenuItem>
        <CgProfile onClick={() => router.push('/mypage')}/>
      </Menu>
    </Nav> 
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px 20px 80px;
  background-color: #fdfdfd;
  color: black;
`;

const Menu = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 40px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Image = styled.img`
  width: 90px;
  height: 30px;
`;
