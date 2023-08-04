import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";

import Icon from "components/Icon";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import Dots from "components/Button/IconButton/Dots";
import Text from "components/Text";

export default function BackTitle({
  type = "white-setting",
  style,
  text,
  ...props
}: any) {
  const router = useRouter();

  return (
    <TitleWrapper styles={style}>
      <MenuList>
        <Menu
          onClick={() => {
            router.back();
          }}
          style={
            type === "map"
              ? {
                  width: 44,
                  height: 44,
                  paddingLeft: 10,
                  borderRadius: 12,
                  boxShadow: "0px 3px 18px 0px rgba(0, 0, 0, 0.08)",
                  backgroundColor: colors.N0,
                }
              : {}
          }
        >
          <Icon
            icon="Arrow"
            width={24}
            height={24}
            color={match(type)
              .with("white-setting", () => colors.N0)
              .with("white", () => colors.N0)
              .with("black-left-text", () => colors.N100)
              .with("map", () => colors.N100)
              .exhaustive()}
          />
          <Text typo="Headline5" color="N100">
            {props.titleText}
          </Text>
        </Menu>
        <Menu>
          {text && (
            <Text typo="Headline4" color="N100">
              {text}
            </Text>
          )}
        </Menu>
        <Menu style={{ width: "24px" }}>
          {type === "white-setting" && <Dots size={20} color="N0" />}
        </Menu>
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<{ styles: any }>`
  height: 50px;
  display: flex;
`;

const MenuList = styled.ul`
  width: 100%;
  height: 50px;
  margin: auto 0;

  display: flex;
  justify-content: space-between;
`;

const Menu = styled.li`
  margin: auto 0;

  display: flex;
  align-items: center;
`;

const Title = styled.div<{ typo: any }>`
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
`;
