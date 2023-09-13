import styled from "@emotion/styled";
import { colors } from "constants/colors";

const Gradient = styled.div<{
  reverse?: boolean;
  size: number;
  location: number;
}>`
  width: 100%;
  height: ${({ size }) => size}px;

  position: absolute;
  ${({ reverse = true, location = 94 }) =>
    reverse ? `bottom: ${location}` : `top: ${location}`}px;
  z-index: 800;
  background: ${({ reverse = true }) =>
    reverse
      ? `linear-gradient(transparent, ${colors.N0})`
      : `linear-gradient(${colors.N0}, transparent)`};
`;

export default Gradient;
