import styled from "@emotion/styled";
import { colors } from "constants/colors";

const Gradient = styled.div<{ size: number }>`
  width: 100%;
  height: ${({ size }) => size}px;

  position: absolute;
  bottom: 94px;
  z-index: 800;
  background: linear-gradient(transparent, ${colors.N0});
`;

export default Gradient;
