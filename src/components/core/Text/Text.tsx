import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import { coreStyles } from "../coreStyles";
import { typography } from "constants/typography";
import { colors } from "constants/colors";

type TextProps = ComponentsProps & {
  c?: any;
  typo?: any;
};

const Text = ({ children, ...props }: TextProps) => {
  return (
    <MaterialBox
      onClick={props?.onClick}
      style={{
        // ...coreStyles(props),
        ...typography[props?.typo],
        color: props?.c && colors[props?.c],
        ...props?.style,
      }}
    >
      {children}
    </MaterialBox>
  );
};

export default Text;
