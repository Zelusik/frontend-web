import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import Text from "components/core/Text";

const RoundButton = forwardRef(function Button(
  {
    children,
    type = "map-text",
    width = 160,
    height = 39,
    action = false,
    onClick,
    ...props
  }: any,
  ref
) {
  return (
    <ButtonWrapper
      onClick={onClick}
      style={{
        width: type === "full-radius" ? 36 : type === "mypage" ? 158 : "auto",
      }}
      height={match(type)
        .with("map-icon", () => 40)
        .with("map-text", () => 40)
        .with("full", () => 38)
        .with("full-radius", () => 38)
        .with("follow-icon", () => 33)
        .with("taste", () => 46)
        .with("text", () => height)
        .with("mypage", () => 48)
        .with("mypage-alert", () => 48)
        .otherwise(() => 40)}
      padding={match(type)
        .with("map-icon", () => "0 11px")
        .with("map-text", () => "0 11px")
        .with("full", () => "0 15px")
        .with("full-radius", () => "0")
        .with("follow-icon", () => "0 11px")
        .with("taste", () => "10px 14px 10px 12px")
        .with("text", () => "0 16px")
        .with("mypage", () => "0")
        .with("mypage-alert", () => "0 18.5px")
        .otherwise(() => "0 11px")}
      borderRadius={match(type)
        .with("map-icon", () => "999px")
        .with("map-text", () => "999px")
        .with("full", () => "12px")
        .with("full-radius", () => "999px")
        .with("follow-icon", () => "999px")
        .with("taste", () => "999px")
        .with("text", () => props.borderRadius)
        .with("mypage", () => "999px")
        .with("mypage-alert", () => "999px")
        .otherwise(() => "999px")}
      borderColor={match(type)
        .with("map-icon", () => (props.isMarkShow ? "Orange600" : "N0"))
        .with("map-text", () => (action ? "Orange600" : "N0"))
        .with("full", () => (action ? "Orange400" : "N40"))
        .with("full-radius", () => (action ? "Orange400" : "N40"))
        .with("follow-icon", () => (action ? "N100" : "N40"))
        .with("taste", () => (action ? "Orange400" : "N20"))
        .with("text", () => (action ? "Orange600" : "N40"))
        .with("mypage", () => "Orange600")
        .with("mypage-alert", () => "Orange600")
        .otherwise(() => "N0")}
      backgroundColor={match(type)
        .with("map-icon", () => (props.isMarkShow ? "Orange600" : "N0"))
        .with("map-text", () => (action ? "Orange600" : "N0"))
        .with("full", () => (action ? "Orange400" : "N0"))
        .with("full-radius", () => (action ? "Orange400" : "N0"))
        .with("follow-icon", () => (action ? "N100" : "N0"))
        .with("taste", () => (action ? "Orange400" : "N0"))
        .with("text", () => (action ? "Orange100" : "N0"))
        .with("mypage", () => "Orange600")
        .with("mypage-alert", () => "Orange600")
        .otherwise(() => "N0")}
      shadow={match(type)
        .with("map-icon", () => true)
        .with("map-text", () => true)
        .with("full", () => false)
        .with("full-radius", () => false)
        .with("follow-icon", () => false)
        .with("taste", () => false)
        .with("text", () => false)
        .with("mypage", () => false)
        .with("mypage-alert", () => false)
        .otherwise(() => true)}
    >
      {type.split("-")[1] === "icon" ? (
        <Menu
          marginRight={match(type)
            .with("map-icon", () => 8)
            .with("follow-icon", () => 4)
            .otherwise(() => 8)}
        >
          <Icon
            icon={match(type)
              .with("map-icon", () => (action ? "Location" : "Bookmark"))
              .with("follow-icon", () => (action ? "Check" : "Plus"))
              .otherwise(() => "Location")}
            width={16}
            height={16}
          />
        </Menu>
      ) : null}
      <Text
        typo={match(type)
          .with("map-icon", () => "Heading2")
          .with("map-text", () => "Heading2")
          .with("full", () => "Paragraph3")
          .with("full-radius", () => "Paragraph3")
          .with("follow-icon", () => "Paragraph2")
          .with("taste", () => "Paragraph5")
          .with("text", () => "Paragraph3")
          .with("mypage", () => "Paragraph5")
          .with("mypage-alert", () => "Paragraph5")
          .otherwise(() => "Heading2")}
        c={match(type)
          .with("map-icon", () => (props.isMarkShow ? "N0" : "N100"))
          .with("map-text", () => (action ? "N0" : "N100"))
          .with("full", () => (action ? "N0" : "N100"))
          .with("full-radius", () => (action ? "N0" : "N100"))
          .with("follow-icon", () => (action ? "N0" : "N100"))
          .with("taste", () => (action ? "N0" : "N100"))
          .with("text", () => (action ? "Orange600" : "N100"))
          .with("mypage", () => "N0")
          .with("mypage-alert", () => "N0")
          .otherwise(() => "N100")}
      >
        {children}
        {type === "follow-icon" ? (action ? "팔로잉" : "팔로우") : null}
      </Text>
    </ButtonWrapper>
  );
});

const ButtonWrapper = styled.button<{
  height: number;
  padding: string;
  shadow: any;
  borderRadius: any;
  borderColor: any;
  backgroundColor: any;
}>`
  width: auto;
  height: ${({ height }) => height}px;
  padding: ${({ padding }) => padding};

  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: ${({ borderColor }) => `1px solid ${colors[borderColor]}`};
  border-radius: ${({ borderRadius }) => borderRadius};
  box-shadow: ${({ shadow }) => shadow && `0px 0px 6px rgba(0, 0, 0, 0.1)`};
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
`;

const Menu = styled.div<{ marginRight?: number; typo?: any; color?: any }>`
  margin-right: ${({ marginRight }) => marginRight}px;
  ${({ typo }) => css`
    ${typo}
  `}
  color: ${({ color }) => color};
`;

export default RoundButton;
