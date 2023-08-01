import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

const BottomButton = forwardRef(function Button(
  {
    children,
    type = "primary",
    width = "100%",
    height = 52,
    onClick,
    disabled = true,
    ...props
  }: any,
  ref
) {
  return (
    <ButtonWrapper
      onClick={onClick}
      style={{
        width: width,
        height: height,
        margin: props.margin,
        padding: props.padding,
      }}
      borderColor={match(type)
        .with("primary", () => (disabled ? colors.Orange200 : colors.Orange600))
        .with("default", () => colors.N40)
        .exhaustive()}
      backgroundColor={match(type)
        .with("primary", () => (disabled ? colors.Orange200 : colors.Orange600))
        .with("default", () => colors.N0)
        .exhaustive()}
      disabled={disabled}
    >
      <ButtonInner
        color={match(type)
          .with("primary", () => colors.N0)
          .with("default", () => colors.N80)
          .exhaustive()}
        typo={typography.Headline3}
      >
        <ButtonSpan style={{ padding: props.textPadding }}>
          {props.text}
          {children}
        </ButtonSpan>
      </ButtonInner>
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<{ backgroundColor: any; borderColor: any }>`
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
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

export default BottomButton;
