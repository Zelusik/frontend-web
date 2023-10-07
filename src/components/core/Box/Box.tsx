import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import styled from "@emotion/styled";
import { coreStyles } from "../coreStyles";
import { ComponentsProps } from "models/componentsModal";

const StyledBox = styled(MaterialBox)``;

const Box = ({ children, ...props }: ComponentsProps) => {
  return (
    <div
      ref={props?.veiwportRef}
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
    </div>
  );
};

export default Box;
