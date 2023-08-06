import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import Text from "components/Text";

const BottomButton = forwardRef(function Button(
  {
    children,
    type = "primary",
    width = "100%",
    height = 54,
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
      <Text
        typo="Headline3"
        color={match(type)
          .with("primary", () => "N0")
          .with("default", () => "N80")
          .exhaustive()}
      >
        {props.text}
        {children}
      </Text>
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<{ backgroundColor: any; borderColor: any }>`
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export default BottomButton;
