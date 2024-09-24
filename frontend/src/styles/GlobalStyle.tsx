// src/styles/GlobalStyle.tsx
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MyCustomFont';
    src: url('/fonts/SUIT-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
  }

  * {
    font-family: 'MyCustomFont', sans-serif;
  }
`;

export default GlobalStyle;
