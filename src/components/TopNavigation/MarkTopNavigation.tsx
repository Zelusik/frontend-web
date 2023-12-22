import React, { useState, useEffect, forwardRef, useRef } from "react";
import useDisplaySize from "@/hooks/useDisplaySize";
import { Divider, Flex, Text } from "@/components/core";

import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import WrapperSlider from "@/components/Slider/WrapperSlider";
import { useAppSelector } from "@/hooks/useReduxHooks";
import { globalValue } from "@/constants/globalValue";

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
    const textLeft = keywordTextRef?.offsetLeft - 20;
    const textWidth = keywordTextRef?.offsetWidth;
    const scrollLeft = textLeft - (display.width - 40 - textWidth) / 2;
    keywordsScrollRef.current!.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;
  };

  return (
    <>
      {/* title 부분 */}
      <Flex
        ref={keywordsScrollRef}
        h={34}
        pl={20}
        pr={20}
        gap={20}
        style={{ whiteSpace: "nowrap", overflowX: "auto" }}
      >
        {keywordDatas?.map((title: string, idx: number) => {
          return (
            <Flex
              key={idx}
              ref={(ref: any) => {
                if (index.wrapperIndex === idx) setKeywordTextRef(ref);
              }}
              h={34}
              direction="column"
              justify="space-between"
              onClick={(ref: any) => handleClickKeyword(ref, idx)}
            >
              <Text
                c={index.wrapperIndex === idx ? "Orange600" : "N40"}
                typo="Headline3"
              >
                {title}
              </Text>
              {index.wrapperIndex === idx && <Divider h={2} c="Orange600" />}
            </Flex>
          );
        })}
      </Flex>
      <Divider ml={20} mr={20} c="N20" />

      {/* children 부분 */}
      <WrapperSlider
        ref={sliderRef}
        index={index}
        touch={touch}
        length={keywordDatas?.length}
        handleSlide={handleSlide}
      >
        {children}
      </WrapperSlider>
    </>
  );
});

export default TopNavigation;
