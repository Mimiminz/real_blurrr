// components/NavBar.tsx

import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuthStore } from "@/store/authStore";
import Notifications from "./Notifications";
import { useLeagueStore } from "@/store/leagueStore";
import LoginForm from "@/components/login/LoginForm";
import SignupForm from "@/components/signup/SignupForm";
import Modal from "../Modal";

type MenuItemProps = {
  $isActive?: boolean;
  onClick: () => void;
};

const NavBar = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [clientIsLoggedIn, setClientIsLoggedIn] = useState<boolean | null>(
    null
  );
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    setClientIsLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveItem("home");
        break;
      case "/league":
        setActiveItem("league");
        break;
      case "/channels":
        setActiveItem("channels");
        break;
      case "/mypage":
        setActiveItem("mypage");
        break;
      default:
        setActiveItem(null);
    }
  }, [pathname]);

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
    router.push("/");
  };

  return (
    <>
      <Nav>
        <ImageContainer
          onClick={() => {
            router.push("/");
            setMenuOpen(false);
          }}
        >
          <Image src="/images/logo/logo.png" alt="로고" />
        </ImageContainer>
        <MenuToggleBtn onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </MenuToggleBtn>
        <Menu className={menuOpen ? "open" : ""}>
          <MenuItem
            onClick={() => {
              setActiveItem("home");
              router.push("/");
              setMenuOpen(false);
            }}
            $isActive={activeItem === "home"}
          >
            홈
          </MenuItem>

          <MenuItem
            onClick={() => {
              setActiveItem("league");
              router.push("/league");
              setMenuOpen(false);
            }}
            $isActive={activeItem === "league"}
          >
            리그
          </MenuItem>
          <MenuItem
            onClick={() => {
              setActiveItem("channels");
              router.push("/channels");
              setMenuOpen(false);
            }}
            $isActive={activeItem === "channels"}
          >
            채널
          </MenuItem>

          {clientIsLoggedIn === null ? (
            <Spinner />
          ) : clientIsLoggedIn ? (
            <>
              <MenuItem
                onClick={() => {
                  setActiveItem("mypage");
                  router.push("/mypage");
                  setMenuOpen(false);
                }}
                $isActive={activeItem === "mypage"}
              >
                마이페이지
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                $isActive={activeItem === "logout"}
              >
                로그아웃
              </MenuItem>
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
        <Modal onClose={closeLoginModal}>
          <LoginForm closeLoginModal={closeLoginModal} />
        </Modal>
      )}

      {isSignupModalOpen && (
        <Modal onClose={closeSignupModal}>
          <SignupForm closeSignupModal={closeSignupModal} />
        </Modal>
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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out,
      visibility 0s linear 0.3s;
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

const MenuItem = styled.div<MenuItemProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 15px;
  padding: 5px 20px;
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 500)};
  color: ${({ $isActive }) => ($isActive ? '#f9803a' : '#000000')};
  text-align: left;

  a {
    color: black;
    text-decoration: none;
  }

  &:hover {
    transform: scale(1.05);
    font-weight: 600;
    color: #f9803a;
  }

  &:active {
    font-weight: 700;
    color: #f9803a;
  }

  @media (max-width: 480px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    width: 85%;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 60px;
  height: auto;

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
    width: 70px;
  }
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
