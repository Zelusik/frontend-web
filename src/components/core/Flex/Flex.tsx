import React from "react";
import styled from "@emotion/styled";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";

const StyledBox = styled(MaterialBox)``;

const Flex = ({ children, ...props }: any) => {
  return (
    <div
      ref={props?.veiwportRef}
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
    </div>
  );
};

export default Flex;
