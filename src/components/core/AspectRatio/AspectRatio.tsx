import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";

type AspectRatioProps = ComponentsProps & {
  ratio?: number;
};

const AspectRatio = ({ children, ...props }: AspectRatioProps) => {
  return (
    <MaterialBox
      style={{
        ...coreStyles(props),
        aspectRatio: props?.ratio,
        ...props.style,
      }}
    >
      {children}
    </MaterialBox>
  );
};

export default AspectRatio;
