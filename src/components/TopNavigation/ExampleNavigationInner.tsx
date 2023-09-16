import React, { useEffect, forwardRef, useRef } from "react";
import styled from "@emotion/styled";

interface Props {
  height?: any;
  children?: any;
}

const ExampleNavigationInner = forwardRef(function Div(
  { children, height, index, touch, keywords, ...props }: any,
  ref: any
) {
  return <div style={{ height: height, overflowY: "auto" }}>{children}</div>;
});

const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const NoContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;

  height: calc(100vh - 227px);
  text-align: center;
`;

export default ExampleNavigationInner;
