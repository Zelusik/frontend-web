import styled from "@emotion/styled";
import { colors } from "@/constants/colors";

const Gradient = styled.div<{
  reverse?: boolean;
  size: number;
  location?: number;
}>`
  width: 100%;
  height: ${({ size }) => size}px;

  position: absolute;
  ${({ reverse = false, location = 94 }) =>
    reverse ? `top: ${location}` : `bottom: ${location}`}px;
  z-index: 800;
  background: ${({ reverse = false }) =>
    reverse
      ? `linear-gradient(${colors.N0}, transparent)`
      : `linear-gradient(transparent, ${colors.N0})`};
`;

export default Gradient;
