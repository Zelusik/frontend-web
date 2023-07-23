import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { typography } from "constants/typography";

export default function Hashtags({ hashtags, side = 20 }: any) {
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
            >
              <Menu typo={typography.Paragraph5}>
                <Menuspan
                  typo={typography.Paragraph4}
                  style={{ color: colors.Orange300 }}
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
}>`
  height: 38px;
  margin-left: ${({ marginLeft, side }) => (marginLeft ? `${side}px` : "0")};
  margin-right: ${({ marginRight, side }) =>
    marginRight ? `${side}px` : "8px"};
  padding: 0 12px;
  display: inline-block;
  border-radius: 40px;
  background-color: ${colors.Orange100};
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

const Menuspan = styled.span<{ typo: any }>`
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