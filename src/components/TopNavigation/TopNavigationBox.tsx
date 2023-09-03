import React, { useEffect, forwardRef, useRef } from "react";
import styled from "@emotion/styled";

interface Props {
  height?: any;
  children?: any;
}

const TopNavigationBox = forwardRef(function Div(
  { height, children, ...props }: Props,
  ref: any
) {
  return (
    <TopNavigationBoxWrapper height={height}>
      {children}
    </TopNavigationBoxWrapper>
  );
});

const TopNavigationBoxWrapper = styled.div<{
  height: number;
}>`
  height: ${({ height }) =>
    typeof height === "number" ? height + "px" : height};
`;

export default TopNavigationBox;
