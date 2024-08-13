"use client";

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "@/store/authStore";
import Notifications from "./Notifications";
import { useLeagueStore } from "@/store/leagueStore";
import LoginForm from "@/components/login/LoginForm";
import SignupForm from "@/components/signup/SignupForm";

const NavBar = () => {
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  const { isLoggedIn, setIsLoggedIn, clearAuthState } = useAuthStore(
    (state) => ({
      isLoggedIn: state.isLoggedIn,
      setIsLoggedIn: state.setIsLoggedIn,
      clearAuthState: state.clearAuthState,
    })
  );
  const {
    setInitialized,
    setUserLeagueList,
    setMentionTabs,
    setIsLoadUserLeagues,
  } = useLeagueStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [clientIsLoggedIn, setClientIsLoggedIn] = useState<boolean | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);

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
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    clearAuthState();
    setIsLoggedIn(false);
    setInitialized(false);
    setUserLeagueList([]);
    setMentionTabs([]);
    setIsLoadUserLeagues(false);
    alert("로그아웃되었습니다.");
    setMenuOpen(false);
  };

  return (
    <>
      <Nav>
        <Image
          src="/images/logo/logo.png"
          alt="로고"
          onClick={() => {
            router.push("/");
            setMenuOpen(false);
          }}
        />
        <MenuToggleBtn onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MenuToggleBtn>
        <Menu className={menuOpen ? "open" : ""}>
          <MenuItem onClick={() => { router.push("/"); setMenuOpen(false); }}>홈</MenuItem>
          <MenuItem onClick={() => { router.push(`/league`); setMenuOpen(false); }}>리그</MenuItem>
          <MenuItem onClick={() => { router.push("/channels"); setMenuOpen(false); }}>채널</MenuItem>

          {clientIsLoggedIn === null ? (
            <Spinner />
          ) : clientIsLoggedIn ? (
            <>
              {/* <MenuItem><IoMdNotifications onClick={handleNotificationsClick} /></MenuItem> */}
              {menuOpen ? (
                <MenuItem>마이페이지</MenuItem>
              ) : (
                <MenuItem>
                  <CgProfile onClick={() => { router.push("/mypage"); setMenuOpen(false); }} />
                </MenuItem>
              )}
              <MenuItem onClick={() => { router.push("/"); handleLogout(); }}>로그아웃</MenuItem>
            </>
          ) : (
            <>
              <MenuItem onClick={openLoginModal}>로그인</MenuItem>
              <MenuItem onClick={openSignupModal}>회원가입</MenuItem>
            </>
          )}
        </Menu>
        {showNotifications && (
          <Notifications onClose={handleCloseNotifications} />
        )}
      </Nav>

      {isLoginModalOpen && (
        <ModalOverlay onClick={closeLoginModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <LoginForm closeLoginModal={closeLoginModal} />
            <CloseButton onClick={closeLoginModal}>×</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {isSignupModalOpen && (
        <ModalOverlay onClick={closeSignupModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <SignupForm closeSignupModal={closeSignupModal} />
            <CloseButton onClick={closeSignupModal}>×</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default NavBar;

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

// 모달창
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
  height: 100%;
  padding: 10px;
  overflow: hidden;

  animation: ${fadeIn} 300ms ease-in-out;

  &.fade-out {
    animation: ${fadeOut} 300ms ease-in-out;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 500px;
    padding: 15px;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 500px;
    padding: 10px;
  }

  @media (min-width: 1024px) {
    width: 90%;
    height: 600px;
    padding: 10px;

  }

  @media (min-width: 1440px) {
    width: 90%;
    height: 600px;
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  background-color: #ffffff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  color: black;

  @media (min-width: 480px) {
    padding: 20px 40px;
  }

  @media (min-width: 768px) {
    padding: 20px 60px;
  }

  @media (min-width: 1024px) {
    padding: 20px 80px;
  }

  @media (min-width: 1440px) {
    padding: 20px 100px;
  }
`;

const MenuToggleBtn = styled.div`
  display: none;
  color: black;

  @media (max-width: 768px) {
    display: flex;
    cursor: pointer;
  }
`;

const Menu = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: bold;
  justify-content: center;
  text-align: left;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #ffffff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10;
    padding: 20px 0;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, visibility 0s linear 0.3s;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
  }

  &.open {
    max-height: 300px;
    opacity: 1;
    visibility: visible;
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 15px;
  margin: 5px 10px;
  font-weight: 500;
  text-align: left;
  a {
    color: black;
    text-decoration: none;
  }

  @media (max-width: 480px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    width: 85%;
  }
`;

const Image = styled.img`
  width: 60px;
  height: auto;
  cursor: pointer;

  @media (min-width: 480px) {
    width: 60px;
  }

  @media (min-width: 768px) {
    width: 60px;
  }

  @media (min-width: 1024px) {
    width: 60px;
  }

  @media (min-width: 1440px) {
    width: 80px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4f4f4f;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
