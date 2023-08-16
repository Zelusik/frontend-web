import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

const Text = styled.div<{ typo?: any; color?: any }>`
  ${({ typo }) => typo && typography[typo]};
  color: ${({ color }) => color && colors[color]};
  white-space: nowrap;
`;

export default Text;
