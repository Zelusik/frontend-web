import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset},
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html, body { max-width: 100%; }
  a {
    text-decoration: none;
    color: inherit;
  }
  body * {
    font-family: Pretendard; 
  }
  #__next {
    height: 100%;
  }
  ol,ul,li {
    list-style: none;
  }
`;

export default GlobalStyles;
