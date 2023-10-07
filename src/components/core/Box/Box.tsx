import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import styled from "@emotion/styled";
import { coreStyles } from "../coreStyles";

const StyledBox = styled(MaterialBox)``;

const Box = ({ children, ...props }: BoxProps) => {
  return (
    <StyledBox
      ref={props?.viewportRef}
      onTouchStart={props?.onTouchStart}
      onTouchMove={props?.onTouchMove}
      onTouchEnd={props?.onTouchEnd}
      onClick={props?.onClick}
      style={{
        ...coreStyles(props),
        ...props.style,
      }}
    >
      {children}
    </StyledBox>
  );
};

export default Box;
