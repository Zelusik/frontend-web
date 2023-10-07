import { forwardRef } from "react";
import styled from "@emotion/styled";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import Text from "components/core/Text";

const AlertButton = forwardRef(function Button(
  { children, type = "primary", onClick, ...props }: any,
  ref
) {
  return (
    <ButtonWrapper
      onClick={onClick}
      borderColor={match(type)
        .with("primary", () => "N100")
        .with("default", () => "N40")
        .otherwise(() => "N100")}
      backgroundColor={match(type)
        .with("primary", () => "N100")
        .with("default", () => "N0")
        .otherwise(() => "N100")}
    >
      <Text
        typo="Paragraph5"
        color={match(type)
          .with("primary", () => "N0")
          .with("default", () => "N100")
          .otherwise(() => "N100")}
      >
        {children}
      </Text>
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<{ backgroundColor: any; borderColor: any }>`
  width: 100%;
  height: 40px;

  border: ${({ borderColor }) => `1px solid ${colors[borderColor]}`};
  border-radius: 999px;
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
`;

export default AlertButton;
