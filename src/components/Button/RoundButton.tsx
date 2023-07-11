import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import { typography } from "constants/typography";

interface Props {
  width?: number;
  height?: number;
  margin?: string;
  padding?: string;
  color?: any;
  borderColor?: any;

  text?: string;
  textColor?: any;
  textTypo?: any;
  textPadding?: string;

  icon?: any;
  onClick?: any;
}

const RoundButton = forwardRef(function Button(
  {
    children,
    type = "following",
    width,
    height = 37,
    onClick,
    act = true,
    ...props
  }: any,
  forwardedRef
) {
  return (
    <ButtonWrapper
      style={{
        width: width,
        height: height,
        margin: props.margin,
        padding: props.padding,
      }}
      color={match(type)
        .with("following", () => (act ? colors.N100 : colors.N0))
        .with("default", () => (act ? colors.N20 : colors.N40))
        .exhaustive()}
      borderColor={match(type)
        .with("following", () => (act ? colors.N100 : colors.N40))
        .with("default", () => (act ? colors.N20 : colors.N40))
        .exhaustive()}
      onClick={onClick}
    >
      <ButtonInner
        color={match(type)
          .with("following", () => act && colors.N0)
          .with("default", () => (act ? colors.N20 : colors.N40))
          .exhaustive()}
        typo={match(type)
          .with("following", () => typography.Paragraph2)
          .with("default", () => (act ? colors.N20 : colors.N40))
          .exhaustive()}
      >
        <ButtonSpan>
          {match(type)
            .with("following", () => (
              <Icon
                icon={act ? "Check" : "Plus"}
                width={12}
                height={12}
                color={act ? colors.N0 : colors.N100}
                fill={act ? colors.N0 : colors.N100}
              />
            ))
            .with("default", () => (act ? colors.N20 : colors.N40))
            .exhaustive()}
        </ButtonSpan>
        <ButtonSpan style={{ padding: props.textPadding }}>
          {match(type)
            .with("following", () => (act ? "팔로잉" : "팔로우"))
            .with("default", () => (act ? colors.N20 : colors.N40))
            .exhaustive()}
        </ButtonSpan>
      </ButtonInner>
    </ButtonWrapper>
  );
});
export default RoundButton;

const ButtonWrapper = styled.button<{ color: any; borderColor: any }>`
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: 999px;
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
