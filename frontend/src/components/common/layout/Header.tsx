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
  width: 100%;
  height: 60px;
  background-color: #fff;
  z-index: 1000;
`;
