import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import { typography } from "constants/typography";

interface Props {}

const RoundButton = forwardRef(function Button(
  {
    children,
    type = "primary",
    height = 37,
    onClick,
    act = true,
    ...props
  }: any,
  forwardedRef
) {
  return (
    <ButtonWrapper
      onClick={onClick}
      style={{
        width: "auto",
        height: type === "default" ? 31 : type === "primary" ? 42 : 38,
        padding: "0 12px",
      }}
      color={match(type)
        .with("primary", () => (act ? colors.Orange600 : colors.N0))
        .with("secondary", () => colors.N0)
        .with("tertiary", () => (act ? colors.Orange600 : colors.N0))
        .with("default", () => (act ? colors.N100 : colors.N0))
        .exhaustive()}
      borderColor={match(type)
        .with("primary", () => (act ? colors.Orange600 : colors.N20))
        .with("secondary", () => colors.N0)
        .with("tertiary", () => (act ? colors.Orange600 : colors.N0))
        .with("default", () => (act ? colors.N100 : colors.N40))
        .exhaustive()}
      shadow={match(type)
        .with("primary", () => false)
        .with("secondary", () => true)
        .with("tertiary", () => true)
        .with("default", () => false)
        .exhaustive()}
    >
      <ButtonInner
        color={match(type)
          .with("primary", () => (act ? colors.N0 : colors.N80))
          .with("secondary", () => colors.N80)
          .with("tertiary", () => (act ? colors.N0 : colors.N80))
          .with("default", () => act && colors.N0)
          .exhaustive()}
        typo={match(type)
          .with("primary", () => typography.Paragraph4)
          .with("secondary", () => typography.Heading2)
          .with("tertiary", () => typography.Heading2)
          .with("default", () => typography.Paragraph2)
          .exhaustive()}
      >
        {type !== "tertiary" && (
          <ButtonSpan>
            <Icon
              icon={match(type)
                .with("primary", () => props.icon)
                .with("secondary", () => (act ? "Location" : "Bookmark"))
                .with("default", () => (act ? "Check" : "Plus"))
                .exhaustive()}
              width={match(type)
                .with("primary", () => 24)
                .with("secondary", () => 16)
                .with("default", () => 12)
                .exhaustive()}
              height={match(type)
                .with("primary", () => 24)
                .with("secondary", () => 16)
                .with("default", () => 12)
                .exhaustive()}
              color={match(type)
                .with("primary", () => {})
                .with("secondary", () => (act ? colors.Orange600 : colors.Mint))
                .with("default", () => (act ? colors.N0 : colors.N100))
                .exhaustive()}
            />
          </ButtonSpan>
        )}
        <ButtonSpan style={{ padding: props.textPadding }}>
          {match(type)
            .with("primary", () => props.text)
            .with("secondary", () => (act ? "내 주변" : "저장"))
            .with("tertiary", () => props.text)
            .with("default", () => (act ? "팔로잉" : "팔로우"))
            .exhaustive()}
        </ButtonSpan>
      </ButtonInner>
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<{
  color: any;
  borderColor: any;
  shadow: any;
}>`
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 999px;
  box-shadow: ${({ shadow }) => shadow && `0px 0px 4px rgba(0, 0, 0, 0.1)`};
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

export default RoundButton;
