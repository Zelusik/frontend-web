import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";

const Box = ({ children, ...props }: ComponentsProps) => {
  return (
    <MaterialBox
      style={{
        ...coreStyles(props),
        display: "flex",
        ...props.style,
      }}
    >
      {children}
    </MaterialBox>
  );
};

export default Box;
