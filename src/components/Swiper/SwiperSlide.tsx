import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/css";

interface Props {
  width?: number;
  style?: any;
  children?: any;
}

const SwiperSlide = forwardRef(function Div(
  { width, style, children, ...props }: Props,
  ref: any
) {
  return (
    <SwiperSlideWrapper ref={ref} width={width} style={style}>
      {children}
    </SwiperSlideWrapper>
  );
});

const SwiperSlideWrapper = styled.div<{ width: number; style: any }>`
  min-width: ${({ width }) => width}px;
  ${({ style }) =>
    style &&
    css`
      ${style}
    `}
`;

export default SwiperSlide;
