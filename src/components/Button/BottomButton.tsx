import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";

import { colors } from "constants/colors";

interface Props {
  type: "primary" | "default";
  width?: number | string;
  height?: number | string;
  disabled?: boolean;
  onClick?: any;
}

export default function BottomButton({
  type = "primary",
  width = "100%",
  height = 54,
  disabled,
  onClick,
  ...props
}: any) {
  return (
    <ButtonWrapper
      style={{
        width: width,
        height: height,
        margin: props.margin,
        padding: props.padding,
      }}
      borderColor={props.borderColor}
      onClick={onClick}
      color={match(type)
        .with("primary", () => (disabled ? colors.Orange200 : colors.Orange400))
        .with("default", () => (disabled ? colors.N20 : colors.N40))
        .exhaustive()}
      disabled={disabled}
    >
      <ButtonInner
        color={match(type)
          .with("primary", () => colors.N0)
          .with("default", () => colors.N100)
          .exhaustive()}
        typo={props.textTypo}
      >
        <ButtonSpan style={{ padding: props.textPadding }}>
          {props.text}
        </ButtonSpan>
      </ButtonInner>
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<{ color: any; borderColor: any }>`
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 8px;
  background-color: ${({ color }) => color};
`;

const ButtonInner = styled.div<{ color: any; typo: any }>`
  margin: auto;
  display: flex;

  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;

const ButtonSpan = styled.span`
  margin: auto;
  display: flex;
`;
