import { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import { colors } from "constants/colors";
import Icon from "components/Icon";
import Text from "components/Text";

const RoundButton = forwardRef(function Button(
  {
    children,
    type = "map-text",
    width = 158,
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
      style={{
        width: type === "full-radius" ? 36 : type === "mypage" ? 158 : "auto",
      }}
      height={match(type)
        .with("map-icon", () => 38)
        .with("map-text", () => 38)
        .with("full", () => 36)
        .with("full-radius", () => 36)
        .with("follow-icon", () => 31)
        .with("taste", () => 44)
        .with("text", () => height)
        .with("mypage", () => 46)
        .with("mypage-alert", () => 46)
        .exhaustive()}
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
        .exhaustive()}
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
        .exhaustive()}
      borderColor={match(type)
        .with("map-icon", () => "N0")
        .with("map-text", () => (action ? "Orange600" : "N0"))
        .with("full", () => (action ? "Orange400" : "N40"))
        .with("full-radius", () => (action ? "Orange400" : "N40"))
        .with("follow-icon", () => (action ? "N100" : "N40"))
        .with("taste", () => (action ? "Orange400" : "N20"))
        .with("text", () => (action ? "Orange600" : "N40"))
        .with("mypage", () => "Orange600")
        .with("mypage-alert", () => "Orange600")
        .exhaustive()}
      backgroundColor={match(type)
        .with("map-icon", () => "N0")
        .with("map-text", () => (action ? "Orange600" : "N0"))
        .with("full", () => (action ? "Orange400" : "N0"))
        .with("full-radius", () => (action ? "Orange400" : "N0"))
        .with("follow-icon", () => (action ? "N100" : "N0"))
        .with("taste", () => (action ? "Orange400" : "N0"))
        .with("text", () => (action ? "Orange100" : "N0"))
        .with("mypage", () => "Orange600")
        .with("mypage-alert", () => "Orange600")
        .exhaustive()}
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
          .exhaustive()}
        color={match(type)
          .with("map-icon", () => "N100")
          .with("map-text", () => (action ? "N0" : "N100"))
          .with("full", () => (action ? "N0" : "N100"))
          .with("full-radius", () => (action ? "N0" : "N100"))
          .with("follow-icon", () => (action ? "N0" : "N100"))
          .with("taste", () => (action ? "N0" : "N100"))
          .with("text", () => (action ? "Orange600" : "N100"))
          .with("mypage", () => "N0")
          .with("mypage-alert", () => "N0")
          .exhaustive()}
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
