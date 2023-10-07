import React from "react";
import styled from "@emotion/styled";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";

const StyledBox = styled(MaterialBox)``;

const Flex = ({ children, ...props }: ComponentsProps) => {
  return (
    <StyledBox
      ref={props?.viewportRef}
      onTouchStart={props?.onTouchStart}
      onTouchMove={props?.onTouchMove}
      onTouchEnd={props?.onTouchEnd}
      onClick={props?.onClick}
      style={{
        ...coreStyles(props),
        display: "flex",
        ...props.style,
      }}
    >
      {children}
    </StyledBox>
  );
};

export default Flex;
