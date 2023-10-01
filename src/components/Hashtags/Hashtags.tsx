import { useRouter } from "next/router";
import { Flex } from "@mantine/core";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Hashtag from "./Hashtag";
import useDisplaySize from "hooks/useDisplaySize";

interface HashtagsProps {
  padding?: number;
  gap?: number;

  color?: any;
  typo?: any;

  hashColor?: any;
  hashTypo?: any;

  textColor?: any;
  textTypo?: any;
  hashtagTextDatas: any;
}

export default function Hashtags({
  padding = 0,
  gap = 6,

  color = "Orange300",
  typo = "Paragraph4",

  hashColor,
  hashTypo,

  textColor,
  textTypo,
  hashtagTextDatas,
}: HashtagsProps) {
  const router = useRouter();

  return (
    <Flex
      pl={padding}
      pr={padding}
      gap={gap}
      // style={{ whiteSpace: "nowrap", overflowX: "auto" }} // 가로 스크롤
    >
      {hashtagTextDatas?.map((hashtagText: string, idx: number) => {
        return (
          <Hashtag
            key={idx}
            color={color}
            typo={typo}
            hashColor={hashColor}
            hashTypo={hashTypo}
            textColor={textColor}
            textTypo={textTypo}
            hashtagText={hashtagText}
          />
        );
      })}
    </Flex>
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
