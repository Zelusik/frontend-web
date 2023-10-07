import React from "react";
import { Button as MaterialButton } from "@material-ui/core";
import { styled } from "@mui/material/styles";

import { ComponentsProps } from "models/componentsModal";
import { colors } from "constants/colors";
import { coreStyles } from "../coreStyles";

const StyledButton = styled(MaterialButton)((props: any) => ({
  "&.MuiButtonBase-root": {
    // color: colors[props?.bg],
  },
}));

const Button = ({ children, ...props }: ComponentsProps) => {
  return (
    <StyledButton
      onClick={props?.onClick}
      style={{
        ...coreStyles(props),
        ...props.style,
      }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
