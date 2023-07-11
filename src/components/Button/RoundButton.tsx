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
    type = "follow",
    width = "auto",
    height = 37,
    padding = "0 12px",
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
        width: width,
        height: type === "follow" ? 31 : type === "icon" ? 42 : 38,
        margin: props.margin,
        padding: padding,
      }}
      color={match(type)
        .with("follow", () => (act ? colors.N100 : colors.N0))
        .with("icon", () => (act ? colors.Orange600 : colors.N0))
        .with("map-icon", () => colors.N0)
        .with("map-text", () => (act ? colors.Orange600 : colors.N0))
        .exhaustive()}
      borderColor={match(type)
        .with("follow", () => (act ? colors.N100 : colors.N40))
        .with("icon", () => (act ? colors.Orange600 : colors.N20))
        .with("map-icon", () => colors.N0)
        .with("map-text", () => (act ? colors.Orange600 : colors.N0))
        .exhaustive()}
      shadow={match(type)
        .with("follow", () => false)
        .with("icon", () => false)
        .with("map-icon", () => true)
        .with("map-text", () => true)
        .exhaustive()}
    >
      <ButtonInner
        color={match(type)
          .with("follow", () => act && colors.N0)
          .with("icon", () => (act ? colors.N0 : colors.N80))
          .with("map-icon", () => colors.N80)
          .with("map-text", () => (act ? colors.N0 : colors.N80))
          .exhaustive()}
        typo={match(type)
          .with("follow", () => typography.Paragraph2)
          .with("icon", () => typography.Paragraph4)
          .with("map-icon", () => typography.Heading2)
          .with("map-text", () => typography.Heading2)
          .exhaustive()}
      >
        {type !== "map-text" && (
          <ButtonSpan>
            <Icon
              icon={match(type)
                .with("follow", () => (act ? "Check" : "Plus"))
                .with("icon", () => props.icon)
                .with("map-icon", () => (act ? "Location" : "Bookmark"))
                .exhaustive()}
              width={match(type)
                .with("follow", () => 12)
                .with("icon", () => 24)
                .with("map-icon", () => 16)
                .exhaustive()}
              height={match(type)
                .with("follow", () => 12)
                .with("icon", () => 24)
                .with("map-icon", () => 16)
                .exhaustive()}
              color={match(type)
                .with("follow", () => (act ? colors.N0 : colors.N100))
                .with("icon", () => {})
                .with("map-icon", () => (act ? colors.Orange600 : colors.Mint))
                .exhaustive()}
            />
          </ButtonSpan>
        )}
        <ButtonSpan style={{ padding: props.textPadding }}>
          {match(type)
            .with("follow", () => (act ? "팔로잉" : "팔로우"))
            .with("icon", () => props.text)
            .with("map-icon", () => (act ? "내 주변" : "저장"))
            .with("map-text", () => props.text)
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
