import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import { typography } from "constants/typography";

interface Props {}

const RoundButton = forwardRef(function Button(
  { children, type = "text", height = 37, onClick, act = true, ...props }: any,
  forwardedRef
) {
  return (
    <ButtonWrapper
      onClick={onClick}
      style={{
        width: "auto",
        height: type === "follow" ? 31 : type === "taste" ? 46 : 38,
        padding: type === "taste" ? "10px 14px 10px 12px" : "0 12px",
        alignItems: "center",
      }}
      color={match(type)
        .with("map-icon", () => colors.N0)
        .with("text", () => (act ? colors.Orange600 : colors.N0))
        .with("follow", () => (act ? colors.N100 : colors.N0))
        .with("taste", () => (act ? colors.Orange400 : colors.N0))
        .exhaustive()}
      borderColor={match(type)
        .with("map-icon", () => colors.N0)
        .with("text", () => (act ? colors.Orange600 : colors.N0))
        .with("follow", () => (act ? colors.N100 : colors.N40))
        .with("taste", () => (act ? colors.Orange400 : colors.N20))
        .exhaustive()}
      shadow={match(type)
        .with("map-icon", () => true)
        .with("text", () => true)
        .with("follow", () => false)
        .with("taste", () => false)
        .exhaustive()}
    >
      <ButtonInner
        color={match(type)
          .with("map-icon", () => colors.N80)
          .with("text", () => (act ? colors.N0 : colors.N80))
          .with("follow", () => act && colors.N0)
          .with("taste", () => (act ? colors.N0 : colors.N80))
          .exhaustive()}
        typo={match(type)
          .with("map-icon", () => typography.Heading2)
          .with("text", () => typography.Heading2)
          .with("follow", () => typography.Paragraph2)
          .with("taste", () => typography.Paragraph4)
          .exhaustive()}
        gap={match(type)
          .with("map-icon", () => "initial")
          .with("text", () => "initial")
          .with("follow", () => "initial")
          .with("taste", () => "8px")
          .exhaustive()}
      >
        {type !== "text" && type !== "taste" && (
          <ButtonSpan>
            <Icon
              icon={match(type)
                .with("map-icon", () => (act ? "Location" : "Bookmark"))
                .with("follow", () => (act ? "Check" : "Plus"))
                .exhaustive()}
              width={match(type)
                .with("map-icon", () => 16)
                .with("follow", () => 12)
                .exhaustive()}
              height={match(type)
                .with("map-icon", () => 16)
                .with("follow", () => 12)
                .exhaustive()}
              color={match(type)
                .with("map-icon", () => (act ? colors.Orange600 : colors.Mint))
                .with("follow", () => (act ? colors.N0 : colors.N100))
                .exhaustive()}
            />
          </ButtonSpan>
        )}
        {type === "taste" && <>{props.icon}</>}
        <ButtonSpan style={{ padding: props.textPadding }}>
          {match(type)
            .with("map-icon", () => (act ? "내 주변" : "저장"))
            .with("text", () => props.text)
            .with("follow", () => (act ? "팔로잉" : "팔로우"))
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
