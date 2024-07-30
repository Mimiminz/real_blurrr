import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useAuthStore } from '@/store/authStore';
import Notifications from './Notifications';

const NavBar = () => {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn,
    setIsLoggedIn: state.setIsLoggedIn
  }))
  const [showNotifications, setShowNotifications] = useState(false);
  const [clientIsLoggedIn, setClientIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    setClientIsLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const handleNotificationsClick = () => {
    setShowNotifications(true);
  };

  const handleCloseNotifications = () => {
    setShowNotifications(false);
  };

  const handleLogout = () => {
    useAuthStore.getState().clearAccessToken();
    setIsLoggedIn(false);
    alert('로그아웃되었습니다.');

    router.push('/');
  };


  return (
    <Nav>
      <Image src='/images/logo/logo.png' onClick={() => router.push('/')} />
      <Menu>
        <MenuItem onClick={() => router.push('/')}>홈</MenuItem>
        <MenuItem onClick={() => router.push('/league')}>리그</MenuItem>
        <MenuItem onClick={() => router.push('/channels')}>채널</MenuItem>
        
        {clientIsLoggedIn === null ? (
          <Spinner />
        ) : clientIsLoggedIn ? (
          <>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            <IconWrapper>
              <IoMdNotifications onClick={handleNotificationsClick} />
              <CgProfile onClick={() => router.push('/mypage')} />
            </IconWrapper>
          </>
        ) : (
          <>
            <MenuItem onClick={() => router.push('/login')}>로그인</MenuItem>
            <MenuItem onClick={() => router.push('/signup')}>회원가입</MenuItem>
          </>
        )}
      </Menu>
      {showNotifications && <Notifications onClose={handleCloseNotifications} />}
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


const IconWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
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

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4f4f4f;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
