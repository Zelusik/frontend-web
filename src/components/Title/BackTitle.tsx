import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";

import Icon from "components/Icon";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import Dots from "components/Button/IconButton/Dots";

export default function BackTitle({
  type = "primary",
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
            type === "tertiary"
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
              .with("primary", () => colors.N0)
              .with("secondary", () => colors.N100)
              .with("tertiary", () => colors.N100)
              .with("default", () => colors.N0)
              .exhaustive()}
          />
          <TitleSide typo={typography.Headline5}>{props.titleText}</TitleSide>
        </Menu>
        <Menu>{text && <Title typo={typography.Headline4}>{text}</Title>}</Menu>
        <Menu style={{ width: "24px" }}>
          {type === "primary" && <Dots size={20} color={colors.N0} />}
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

const TitleSide = styled.div<{ typo: any }>`
  margin-left: 6px;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
`;

const Title = styled.div<{ typo: any }>`
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
`;
