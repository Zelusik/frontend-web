import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import Icon from "components/Icon";

const RoundButton = forwardRef(function Button(
  {
    children,
    type = "map-text",
    height = 37,
    action = false,
    onClick,
    ...props
  }: any,
  ref
) {
  return (
    <ButtonWrapper
      onClick={onClick}
      style={{ width: type === "full-radius" ? 36 : "auto" }}
      height={match(type)
        .with("map-icon", () => 38)
        .with("map-text", () => 38)
        .with("full", () => 36)
        .with("full-radius", () => 36)
        .with("follow-icon", () => 31)
        .with("taste", () => 44)
        .with("text", () => height)
        .exhaustive()}
      padding={match(type)
        .with("map-icon", () => "0 11px")
        .with("map-text", () => "0 11px")
        .with("full", () => "0 15px")
        .with("full-radius", () => "0")
        .with("follow-icon", () => "0 11px")
        .with("taste", () => "10px 14px 10px 12px")
        .with("text", () => "0 16px")
        .exhaustive()}
      borderRadius={match(type)
        .with("map-icon", () => "999px")
        .with("map-text", () => "999px")
        .with("full", () => "12px")
        .with("full-radius", () => "999px")
        .with("follow-icon", () => "999px")
        .with("taste", () => "999px")
        .with("text", () => props.borderRadius)
        .exhaustive()}
      borderColor={match(type)
        .with("map-icon", () => colors.N0)
        .with("map-text", () => (action ? colors.Orange600 : colors.N0))
        .with("full", () => (action ? colors.Orange400 : colors.N40))
        .with("full-radius", () => (action ? colors.Orange400 : colors.N40))
        .with("follow-icon", () => (action ? colors.N100 : colors.N40))
        .with("taste", () => (action ? colors.Orange400 : colors.N20))
        .with("text", () => (action ? colors.Orange600 : colors.N40))
        .exhaustive()}
      backgroundColor={match(type)
        .with("map-icon", () => colors.N0)
        .with("map-text", () => (action ? colors.Orange600 : colors.N0))
        .with("full", () => (action ? colors.Orange400 : colors.N0))
        .with("full-radius", () => (action ? colors.Orange400 : colors.N0))
        .with("follow-icon", () => (action ? colors.N100 : colors.N0))
        .with("taste", () => (action ? colors.Orange400 : colors.N0))
        .with("text", () => (action ? colors.Orange100 : colors.N0))
        .exhaustive()}
      shadow={match(type)
        .with("map-icon", () => true)
        .with("map-text", () => true)
        .with("full", () => false)
        .with("full-radius", () => false)
        .with("follow-icon", () => false)
        .with("taste", () => false)
        .with("text", () => false)
        .exhaustive()}
    >
      {type.split("-")[1] === "icon" ? (
        <Menu
          marginRight={match(type)
            .with("map-icon", () => 8)
            .with("follow-icon", () => 4)
            .exhaustive()}
        >
          <Icon
            icon={match(type)
              .with("map-icon", () => (action ? "Location" : "Bookmark"))
              .with("follow-icon", () => (action ? "Check" : "Plus"))
              .exhaustive()}
            width={16}
            height={16}
          />
        </Menu>
      ) : null}
      <Menu
        typo={match(type)
          .with("map-icon", () => typography.Heading2)
          .with("map-text", () => typography.Heading2)
          .with("full", () => typography.Paragraph3)
          .with("full-radius", () => typography.Paragraph3)
          .with("follow-icon", () => typography.Paragraph2)
          .with("taste", () => typography.Paragraph5)
          .with("text", () => typography.Paragraph3)
          .exhaustive()}
        color={match(type)
          .with("map-icon", () => colors.N100)
          .with("map-text", () => (action ? colors.N0 : colors.N100))
          .with("full", () => (action ? colors.N0 : colors.N100))
          .with("full-radius", () => (action ? colors.N0 : colors.N100))
          .with("follow-icon", () => (action ? colors.N0 : colors.N100))
          .with("taste", () => (action ? colors.N0 : colors.N100))
          .with("text", () => (action ? colors.Orange600 : colors.N100))
          .exhaustive()}
      >
        {children}
        {type === "follow-icon" ? (action ? "팔로잉" : "팔로우") : null}
      </Menu>
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<{
  height: number;
  padding: string;
  backgroundColor: any;
  borderColor: any;
  shadow: any;
  borderRadius: any;
}>`
  width: auto;
  height: ${({ height }) => height}px;
  padding: ${({ padding }) => padding};

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: ${({ borderColor }) => `1px solid ${borderColor}`};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ shadow }) => shadow && `0px 0px 6px rgba(0, 0, 0, 0.1)`};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Menu = styled.div<{ marginRight?: number; typo?: any; color?: any }>`
  margin-right: ${({ marginRight }) => marginRight}px;
  ${({ typo }) => css`
    ${typo}
  `}
  color: ${({ color }) => color};
`;

export default RoundButton;
