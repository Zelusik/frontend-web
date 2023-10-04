import React, { forwardRef, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ScrollArea, Box, Flex, Text, Space, Divider } from "@mantine/core";
import { match } from "ts-pattern";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Hr from "components/Hr";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import SortingHeader from "view/Mark/components/StoreCount";
import { useAppSelector } from "hooks/useReduxHooks";
import { globalValue } from "constants/globalValue";

const TopNavigation = forwardRef(function Div(
  {
    children,
    type = "store-detail",
    index,
    scrollRef,
    scrollTop,
    titleList = [],
    ...props
  }: any,
  ref: any
) {
  const router = useRouter();
  const swiperRef = useRef<any>(null);
  const { display } = useAppSelector((state) => state.global);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(props.currentIndex);
    }
  }, [props.currentIndex]);

  const onSlideChange = (e: any) => {
    // let newSwiper = e.activeIndex;
    // props.setCurrentIndex(newSwiper);
    // if (scrollRef.current?.scrollTop > scrollTop) {
    //   scrollRef.current!.scrollTop = scrollTop;
    // }
  };

  return (
    <>
      <Flex
        // ref={keywordsScrollRef}
        h={34}
        pl={20}
        pr={20}
        gap={20}
        pos="sticky"
        top={0}
        bg={colors["N0"]}
        style={{ whiteSpace: "nowrap", overflowX: "auto", zIndex: 2 }}
      >
        {["추천 맛집", "리뷰"]?.map((title: string, idx: number) => {
          return (
            <Flex
              key={idx}
              ref={(ref: any) => {
                // if (index.wrapperIndex === idx) setKeywordTextRef(ref);
              }}
              h={34}
              direction="column"
              justify="space-between"
              // onClick={(ref: any) => handleClickKeyword(ref, idx)}
            >
              <Text c={colors["Orange600"]} style={typography["Headline3"]}>
                {title}
              </Text>
              {index.wrapperIndex === idx && (
                <Divider size={2} color={colors["Orange600"]} />
              )}
            </Flex>
          );
        })}
      </Flex>
      <Divider ml={20} mr={20} color={colors["N20"]} />
      {/* {props.topFixed && (
        <TopFixed
          height={match(type)
            .with("store-detail", () => 38)
            .otherwise(() => 35)}
        />
      )}
      <Spacing
        size={match(type)
          .with("store-detail", () => 30)
          .with("search-place", () => 0)
          .with("mypage", () => 20)
          .with("mark", () => 0)
          .otherwise(() => 30)}
      />
      {type === "mark" ? <SortingHeader count={props.count} /> : null} */}

      <Swiper
        ref={swiperRef}
        // allowSlidePrev={props.currentIndex > 0}
        // allowSlideNext={props.currentIndex !== children?.length - 1}
        onSlideChange={onSlideChange}
        style={{
          width: display.width,
          height: display.height - 85 - globalValue.BOTTOM_NAVIGATION_HEIGHT,
          backgroundColor: "yellowgreen",
        }}
      >
        {children?.map((data: any, idx: number) => {
          return <SwiperSlide key={idx}>{data}</SwiperSlide>;
        })}
      </Swiper>
    </>
  );
});

const TitleSelection = styled.div<{
  top: any;
  height: number;
  padding: number;
  topFixed: any;
  background: string;
}>`
  width: 100%;
  height: ${({ height }) => height}px;
  padding: 0 ${({ padding }) => padding}px;

  position: ${({ topFixed }) => (topFixed ? "fixed" : "relative")};
  top: ${({ topFixed, top }) => (topFixed ? top + "px" : 0)};
  background-color: ${({ background }) => background};
  z-index: 900;
`;

const TitleWrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height + "px"};
  padding: 0 20px;
  display: flex;
  gap: 24px;

  flex-direction: row;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow-x: auto;
`;

const TitleLine = styled.div<{
  typo: any;
  act: boolean;
  color: any;
}>`
  border-bottom: 2px solid ${({ act, color }) => (act ? color : colors.N0)};

  ${({ typo }) =>
    typo &&
    css`
      ${typography[typo]}
    `};
  color: ${({ act, color }) => (act ? color : colors.N40)};
`;

const TopFixed = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;

export default TopNavigation;
