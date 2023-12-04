import React from "react";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";

const Divider = ({ children, ...props }: ComponentsProps) => {
  return (
    <hr
      style={{
        ...coreStyles(props),
        padding: 0,
        border: "0 solid transparent",
      }}
    />
  );
};

export default Divider;
