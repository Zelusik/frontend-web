import { css, Global } from "@emotion/react";
import { colors } from "constants/colors";

export default function GlobalStyle({ modal }: any) {
  return <Global styles={globalCss} />;
}
const globalCss = css`
  @font-face {
    font-family: "SpoqaHanSansNeoBold";
    src: url(/fonts/SpoqaHanSansNeo-Bold.ttf);
  }
  @font-face {
    font-family: "SpoqaHanSansNeoLight";
    src: url(/fonts/SpoqaHanSansNeo-Light.ttf);
  }
  @font-face {
    font-family: "SpoqaHanSansNeoMedium";
    src: url(/fonts/SpoqaHanSansNeo-Medium.ttf);
  }
  @font-face {
    font-family: "SpoqaHanSansNeoRegular";
    src: url(/fonts/SpoqaHanSansNeo-Regular.ttf);
  }
  @font-face {
    font-family: "SpoqaHanSansNeoThin";
    src: url(/fonts/SpoqaHanSansNeo-Thin.ttf);
  }

  * {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    user-select: none;
    -webkit-touch-callout: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
    box-sizing: border-box;
  }

  body,
  html,
  #__next {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    max-width: 820px;
    margin: 0 auto;
    font-family: "Pretendard", sans-serif;
    background-color: ${colors.N0};
    color: ${colors.N100};
    min-height: 100dvh;
  }
  ::-webkit-scrollbar {
    display: none;
  }

  a {
    text-decoration: none;
  }

  main {
    display: block;
  }

  legend {
    display: table;
    float: left;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  legend + * {
    clear: both;
  }

  fieldset {
    border: 0;
    padding: 0.01em 0 0 0;
    margin: 0;
    min-width: 0;
  }

  body:not(:-moz-handler-blocked) fieldset {
    display: table-cell;
  }

  ul,
  ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
    line-height: normal;
  }

  &::-moz-focus-inner {
    border: 0;
    padding: 0;
  }
`;
