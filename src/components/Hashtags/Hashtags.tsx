import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { colors } from "constants/colors";
import { css } from "@emotion/react";
import { match } from "ts-pattern";
import Hashtag from "./Hashtag";

export default function Hashtags({
  type = "primary",
  hashtags,
  side = 20,
}: any) {
  const router = useRouter();

  return (
    <HashtagsWrapper>
      <HashtagsInner>
        {hashtags?.map((data: string, idx: number) => {
          return (
            <Hashtag
              key={idx}
              type={type}
              idx={idx}
              len={hashtags?.length}
              side={side}
              text={data}
            />
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
