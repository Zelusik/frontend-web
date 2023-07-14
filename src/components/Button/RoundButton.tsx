import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import { typography } from "constants/typography";

interface Props {}

const RoundButton = forwardRef(function Button(
  { children, type = "primary", height = 37, onClick, act = true, ...props }: any,
  forwardedRef
) {
  return (
    <ButtonWrapper
      onClick={onClick}
      style={{
        width: "auto",
        height:
          type === "default"
            ? 31
            : type === "primary"
            ? 42
            : type === "taste"
            ? 46
            : 38,
        padding: type === "taste" ? "10px 14px 10px 12px" : "0 12px",
        alignItems: "center",
      }}
      color={match(type)
        .with("primary", () => (act ? colors.Orange600 : colors.N0))
        .with("secondary", () => colors.N0)
        .with("tertiary", () => (act ? colors.Orange600 : colors.N0))
        .with("default", () => (act ? colors.N100 : colors.N0))
        .with("taste", () => (act ? colors.Orange400 : colors.N0))
        .exhaustive()}
      borderColor={match(type)
        .with("primary", () => (act ? colors.Orange600 : colors.N20))
        .with("secondary", () => colors.N0)
        .with("tertiary", () => (act ? colors.Orange600 : colors.N0))
        .with("default", () => (act ? colors.N100 : colors.N40))
        .with("taste", () => (act ? colors.Orange400 : colors.N20))
        .exhaustive()}
      shadow={match(type)
        .with("primary", () => false)
        .with("secondary", () => true)
        .with("tertiary", () => true)
        .with("default", () => false)
        .with("taste", () => false)
        .exhaustive()}
    >
      <ButtonInner
        color={match(type)
          .with("primary", () => (act ? colors.N0 : colors.N80))
          .with("secondary", () => colors.N80)
          .with("tertiary", () => (act ? colors.N0 : colors.N80))
          .with("default", () => act && colors.N0)
          .with("taste", () => (act ? colors.N0 : colors.N80))
          .exhaustive()}
        typo={match(type)
          .with("primary", () => typography.Paragraph4)
          .with("secondary", () => typography.Heading2)
          .with("tertiary", () => typography.Heading2)
          .with("default", () => typography.Paragraph2)
          .with("taste", () => typography.Paragraph4)
          .exhaustive()}
        gap={match(type)
          .with("primary", () => "initial")
          .with("secondary", () => "initial")
          .with("tertiary", () => "initial")
          .with("default", () => "initial")
          .with("taste", () => "8px")
          .exhaustive()}
      >
        {type !== "tertiary" && type !== "taste" && (
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
        {type === "taste" && <>{props.icon}</>}
        <ButtonSpan style={{ padding: props.textPadding }}>
          {match(type)
            .with("primary", () => props.text)
            .with("secondary", () => (act ? "내 주변" : "저장"))
            .with("tertiary", () => props.text)
            .with("default", () => (act ? "팔로잉" : "팔로우"))
            .with("taste", () => props.text)
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

const ButtonInner = styled.div<{ color: any; typo: any; gap?: string }>`
  margin: auto;
  display: flex;
  gap: ${({ gap }) => gap};
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
