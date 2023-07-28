import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { match } from "ts-pattern";

import Setting from "components/Setting";
import Icon from "components/Icon";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

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
        >
          <Icon
            icon="Arrow"
            width={24}
            height={24}
            color={match(type)
              .with("primary", () => colors.N0)
              .with("secondary", () => colors.N100)
              .with("default", () => colors.N100)
              .exhaustive()}
          />
          <TitleSide typo={typography.Headline5}>{props.titleText}</TitleSide>
        </Menu>
        <Menu>{text && <Title typo={typography.Headline4}>{text}</Title>}</Menu>
        <Menu style={{ width: "24px" }}>
          {type === "primary" && <Setting size={20} color={colors.N0} />}
        </Menu>
      </MenuList>
    </TitleWrapper>
  );
}

const TitleWrapper = styled.div<{ styles: any }>`
  height: 50px;
  display: flex;
  padding: 14px 0;
`;

const MenuList = styled.ul`
  width: 100%;
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
