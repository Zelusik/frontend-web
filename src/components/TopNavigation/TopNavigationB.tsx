import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Flex, Box, Text, Divider } from "@mantine/core";
import useDisplaySize from "hooks/useDisplaySize";

import { colors } from "constants/colors";
import { typography } from "constants/typography";
import WrapperSlider from "components/Slider/WrapperSlider";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";

interface TopNavigationProps {
  height?: number;
  index?: any;
  top?: any;
  touch?: any;
  scrollTop?: number;

  keywordDatas: string[];
  children?: React.ReactNode;
}

const TopNavigation = forwardRef(function Div({
  height,
  index,
  top,
  touch,
  scrollTop = 0,

  keywordDatas,
  children,
}: TopNavigationProps) {
  const { display } = useAppSelector((state) => state.global);
  const keywordsScrollRef = useRef<any>(null);
  const [keywordTextRef, setKeywordTextRef] = useState<any>(null);

  const handleClickKeyword = (ref: any, newIndex: number) => {
    // wrapperIndex 수정
    index.setWrapperIndex(newIndex);

    // title click -> focus on
    const textLeft = ref?.nativeEvent?.target?.offsetLeft - 20;
    const textWidth = ref?.target?.offsetWidth;
    const scrollLeft = textLeft - (display.width - 40 - textWidth) / 2;
    keywordsScrollRef.current!.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;

    // 스크롤 초기화
    // if (scrollRef.current?.scrollTop > scrollTop) {
    //   scrollRef.current!.scrollTop = scrollTop;
    // }
  };

  const sliderRef = useRef<any>(null);
  const handleSlide = () => {
    // slide -> focus on
    // const textLeft = keywordTextRef?.offsetLeft - 20;
    // const textWidth = keywordTextRef?.offsetWidth;
    // const scrollLeft = textLeft - (display.width - 40 - textWidth) / 2;
    // keywordsScrollRef.current!.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
  };

  return (
    <Box pos="absolute" top={85}>
      {/* <Box h={367} /> */}
      {/* children 부분 */}
      <WrapperSlider
        ref={sliderRef}
        height={height}
        index={index}
        touch={touch}
        length={keywordDatas?.length}
        handleSlide={handleSlide}
      >
        {children}
      </WrapperSlider>
    </Box>
  );
});

export default TopNavigation;
