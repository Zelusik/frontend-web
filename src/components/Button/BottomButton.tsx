import { forwardRef } from "react";
import styled from "@emotion/styled";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
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
        .with("primary", () => (disabled ? "Orange200" : "Orange600"))
        .with("default", () => "N40")
        .otherwise(() => "Orange200")}
      backgroundColor={match(type)
        .with("primary", () => (disabled ? "Orange200" : "Orange600"))
        .with("default", () => "N0")
        .otherwise(() => "Orange200")}
      disabled={disabled}
    >
      <Text
        typo="Headline3"
        color={match(type)
          .with("primary", () => "N0")
          .with("default", () => "N80")
          .otherwise(() => "N0")}
      >
        {props.text}
        {children}
      </Text>
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<{ backgroundColor: any; borderColor: any }>`
  border: ${({ borderColor }) => `1px solid ${colors[borderColor]}`};
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
`;

export default BottomButton;
