import React from "react";
import { Button as MaterialButton } from "@material-ui/core";
import { styled } from "@mui/material/styles";

import { ComponentsProps } from "models/componentsModal";
import { colors } from "constants/colors";
import { coreStyles } from "../coreStyles";
import Space from "../Space";

type ButtonProps = ComponentsProps & {
  leftGap?: string | number;
  rightGap?: string | number;

  disabled?: boolean;
  renderLeft?: React.ReactNode;
  renderRight?: React.ReactNode;
};

const StyledButton = styled(MaterialButton)((props: any) => ({
  "&.MuiButtonBase-root": {
    color: colors[props?.bg],
  },
  "&.MuiButtonBase-selected": {
    color: colors[props?.bg],
  },
}));

const Button = ({
  leftGap = 0,
  rightGap = 0,

  disabled,
  renderLeft,
  renderRight,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      style={{
        ...coreStyles(props),
        ...props.style,
      }}
      disabled={disabled}
      onClick={props?.onClick}
    >
      {renderLeft && (
        <>
          {renderLeft}
          <Space w={leftGap} />
        </>
      )}

      {children}

      {renderRight && (
        <>
          <Space w={rightGap} />
          {renderRight}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
