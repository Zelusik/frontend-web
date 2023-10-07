import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import { coreStyles } from "../coreStyles";
import { ComponentsProps } from "models/componentsModal";
import { colors } from "constants/colors";

type GradientProps = ComponentsProps & {
  dir?: "top" | "right" | "bottom" | "left";
};

const Gradient = ({ children, ...props }: GradientProps) => {
  return (
    <MaterialBox
      onTouchStart={props?.onTouchStart}
      onTouchMove={props?.onTouchMove}
      onTouchEnd={props?.onTouchEnd}
      onClick={props?.onClick}
      style={{
        ...coreStyles(props),
        position: "absolute",
        zIndex: 800,
        background: `linear-gradient(to ${props?.dir}, transparent, ${
          colors[props?.bg]
        })`,
        ...props.style,
      }}
    >
      {children}
    </MaterialBox>
  );
};

Gradient.defaultProps = {
  w: "100%",
  bg: "N0",
  dir: "top",
};

export default Gradient;
