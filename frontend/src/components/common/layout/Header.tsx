import React from "react";
import styled from "styled-components";
import NavBar from "../navbar/NavBar";

const Header = () => {
  return (
    <HeaderContainer>
      <NavBar />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  /* position: fixed;
  top: 0;
  left: 0; */
  width: 100%;
  height: 60px;
  background-color: #fff;
  z-index: 1000;
`;
