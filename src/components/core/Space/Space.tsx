import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";

const Space = ({ children, ...props }: ComponentsProps) => {
  return (
    <MaterialBox
      style={{
        ...coreStyles(props),
        ...props.style,
      }}
    >
      {children}
    </MaterialBox>
  );
};

export default Space;
