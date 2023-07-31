"use client";
import { colors } from "constants/colors";
import { css, styled } from "styled-components";
import { match } from "ts-pattern";

interface Props {
  horizonal?: boolean;
  size?: number;
}

const Hr = ({ horizonal = false, size = 1 }: Props) => {
  return <HrWrapper horizonal={horizonal} size={size} />;
};

const HrWrapper = styled.hr<{ horizonal: boolean; size: number }>`
  ${({ horizonal, size }) =>
    horizonal
      ? css`
          width: ${size}px;
          height: 100%;
        `
      : css`
          width: 100%;
          height: ${size}px;
        `}
  margin: 0;
  padding: 0;
  border: 0;
  background-color: ${colors.N20};
`;

export default Hr;
