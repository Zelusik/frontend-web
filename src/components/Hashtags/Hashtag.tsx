import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { typography } from "constants/typography";
import { match } from "ts-pattern";

export default function Hashtag({
  type = "primary",
  idx = -1,
  len = -1,
  side = 0,
  text = "_____",
}: any) {
  const router = useRouter();

  return (
    <MenuWrapper
      marginLeft={idx === 0}
      marginRight={idx === len - 1}
      side={side}
      backgroundColor={match(type)
        .with("primary", () => colors.Orange100)
        .with("secondary", () => colors.N10)
        .with("default", () => colors.Orange100)
        .exhaustive()}
    >
      <Menu
        typo={match(type)
          .with("primary", () => typography.Paragraph4)
          .with("secondary", () => typography.Paragraph4)
          .with("default", () => typography.Headline2)
          .exhaustive()}
        color={match(type)
          .with("primary", () => colors.N100)
          .with("secondary", () => colors.N100)
          .with("default", () => colors.Orange500)
          .exhaustive()}
      >
        <Menuspan
          typo={match(type)
            .with("primary", () => typography.Paragraph4)
            .with("secondary", () => typography.Paragraph4)
            .with("default", () => typography.Headline2)
            .exhaustive()}
          color={match(type)
            .with("primary", () => colors.Orange300)
            .with("secondary", () => colors.N60)
            .with("default", () => colors.Orange500)
            .exhaustive()}
        >
          #&nbsp;
        </Menuspan>
        {text}
      </Menu>
    </MenuWrapper>
  );
}

const HashtagsWrapper = styled.div`
  display: flex;
  white-space: nowrap;
`;

const HashtagsInner = styled.div`
  display: flex;
  overflow: auto;
`;

const MenuWrapper = styled.div<{
  marginLeft: boolean;
  marginRight: boolean;
  side: number;
  backgroundColor: any;
}>`
  height: 40px;
  margin-left: ${({ marginLeft, side }) => (marginLeft ? `${side}px` : "0")};
  margin-right: ${({ marginRight, side }) =>
    marginRight ? `${side}px` : "6px"};
  padding: 0 12px;
  display: inline-block;
  border-radius: 40px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Menuspan = styled.span<{ typo: any; color: any }>`
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;

const Menu = styled.div<{ typo: any; color: any }>`
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
  color: ${({ color }) => color};
`;
