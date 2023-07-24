import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { typography } from "constants/typography";
import { match } from "ts-pattern";

export default function Hashtags({
  type = "primary",
  hashtags,
  side = 20,
}: any) {
  const router = useRouter();

  return (
    <HashtagsWrapper>
      <HashtagsInner>
        {hashtags.map((data: string, idx: number) => {
          return (
            <MenuWrapper
              key={idx}
              marginLeft={idx === 0}
              marginRight={idx === hashtags.length - 1}
              side={side}
              color={match(type)
                .with("primary", () => colors.Orange100)
                .with("default", () => colors.N10)
                .exhaustive()}
            >
              <Menu typo={typography.Paragraph5}>
                <Menuspan
                  typo={typography.Paragraph4}
                  color={match(type)
                    .with("primary", () => colors.Orange300)
                    .with("default", () => colors.N60)
                    .exhaustive()}
                >
                  #&nbsp;
                </Menuspan>
                {data}
              </Menu>
            </MenuWrapper>
          );
        })}
      </HashtagsInner>
    </HashtagsWrapper>
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
  color: any;
}>`
  height: 40px;
  margin-left: ${({ marginLeft, side }) => (marginLeft ? `${side}px` : "0")};
  margin-right: ${({ marginRight, side }) =>
    marginRight ? `${side}px` : "8px"};
  padding: 0 12px;
  display: inline-block;
  border-radius: 40px;
  background-color: ${({ color }) => color};
`;

const Menu = styled.div<{ typo: any }>`
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  ${({ typo }) =>
    typo &&
    css`
      ${typo}
    `}
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
