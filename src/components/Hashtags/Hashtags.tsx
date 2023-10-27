import { useRouter } from "next/router";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Hashtag from "./Hashtag";
import { Flex } from "components/core";

interface HashtagsProps {
  padding?: number;
  gap?: number;

  color?: any;
  typo?: any;
  background?: any;

  hashColor?: any;
  hashTypo?: any;

  textColor?: any;
  textTypo?: any;
  hashtagTextDatas: any;
}

const Hashtags = ({
  padding = 0,
  gap = 6,

  color = "Orange300",
  typo = "Paragraph4",
  background,

  hashColor,
  hashTypo,

  textColor,
  textTypo,
  hashtagTextDatas,
}: HashtagsProps) => {
  const router = useRouter();

  return (
    <Flex
      ph={padding}
      gap={gap}
      // style={{ whiteSpace: "nowrap", overflowX: "auto" }} // 가로 스크롤
    >
      {hashtagTextDatas?.map((hashtagText: string, idx: number) => {
        return (
          <Hashtag
            key={idx}
            color={color}
            typo={typo}
            background={background}
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
};

export default Hashtags;
