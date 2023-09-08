import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";

const Hr = styled.hr<{
  horizonal?: boolean;
  size?: number;
  padding?: number;
  backgroundColor?: any;
}>`
  ${({ horizonal = false, size = 1, padding = 0 }) =>
    horizonal
      ? css`
          width: ${size}px;
          height: calc(100% - ${padding}px) px;
          margin: ${padding}px 0;
        `
      : css`
          width: calc(100% - ${padding}px) px;
          height: ${size}px;
          margin: 0 ${padding}px;
        `}
  padding: 0;
  border: 0 solid transparent;

  background-color: ${({ backgroundColor = "N20" }) => colors[backgroundColor]};
`;

export default Hr;
