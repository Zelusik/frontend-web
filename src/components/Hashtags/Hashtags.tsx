import { useRouter } from "next/router";
import styled from "@emotion/styled";

import Hashtag from "./Hashtag";
import SlendarHashtag from "./SlendarHashtag";

interface HashtagsProps {
  type?: "slendar" | undefined;
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
  type,
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
    <ScrollWrapper
      padding={padding}
      // ph={padding}
      // dis="flex"
      // gap={gap}
      // style={{ whiteSpace: "nowrap" }} // 가로 스크롤
    >
      <ScrollInner gap={gap}>
        {hashtagTextDatas?.map((hashtagText: string, idx: number) => {
          return type === "slendar" ? (
            <SlendarHashtag
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
          ) : (
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
      </ScrollInner>
    </ScrollWrapper>
  );
};

const ScrollWrapper = styled.div<{ padding: number }>`
  padding: ${({ padding }) => `0 ${padding}px`};
  display: flex;
  white-space: nowrap;
  overflow: auto;
`;

const ScrollInner = styled.div<{ gap: number }>`
  gap: ${({ gap }) => gap}px;
  display: flex;
`;

export default Hashtags;
