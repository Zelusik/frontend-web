import React, { forwardRef, useRef, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";
import { match } from "ts-pattern";

import Hr from "components/Hr";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TopNavigation = forwardRef(function (
  {
    children,
    scrollRef,
    scrollTop,

    type = "store-detail",
    state,
    titleList = [],
  }: any,
  ref
) {
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    state.setCurrentIndex(newSwiper);

    if (scrollRef.current?.scrollTop > scrollTop) {
      scrollRef.current!.scrollTop = scrollTop;
    }
  };

  return (
    <>
      <TitleSelection
        height={match(type)
          .with("store-detail", () => 38)
          .with("search-place", () => 34)
          .with("mypage", () => 35)
          .exhaustive()}
        topFixed={state.topFixed}
      >
        <TitleWrapper style={{ height: 35 }}>
          {titleList.map((data: any, idx: number) => {
            return (
              <TitleLine
                key={idx}
                typo={match(type)
                  .with("store-detail", () => typography.Headline4)
                  .with("search-place", () => typography.Headline3)
                  .with("mypage", () => typography.Headline3)
                  .exhaustive()}
                action={idx === state.currentIndex}
                onClick={() => {
                  state.setCurrentIndex(idx);
                  const middle = state.currentIndex - idx;
                  if (middle < 0) {
                    for (let i = 0; i < Math.abs(middle); i++)
                      swiperRef.current.swiper.slideNext();
                  } else {
                    for (let i = 0; i < Math.abs(middle); i++)
                      swiperRef.current.swiper.slidePrev();
                  }
                }}
              >
                {data}
              </TitleLine>
            );
          })}
        </TitleWrapper>
        <Hr />
      </TitleSelection>
      {state.topFixed && (
        <TopFixed
          height={match(type)
            .with("store-detail", () => 38)
            .with("search-place", () => 34)
            .with("mypage", () => 35)
            .exhaustive()}
        />
      )}
      <Spacing
        size={match(type)
          .with("store-detail", () => 30)
          .with("search-place", () => 0)
          .with("mypage", () => 20)
          .exhaustive()}
      />

      <Swiper ref={swiperRef} onSlideChange={onSlideChange}>
        {children.map((data: any, idx: number) => {
          return <SwiperSlide key={idx}>{data}</SwiperSlide>;
        })}
      </Swiper>
    </>
  );
});

const TitleSelection = styled.div<{ height: number; topFixed: any }>`
  width: 100%;
  height: ${({ height }) => height + "px"};
  padding: 0 20px;

  position: ${({ topFixed }) => (topFixed ? "fixed" : "relative")};
  top: ${({ topFixed }) => (topFixed ? "50px" : "0")};
  background-color: ${colors.N0};
  z-index: 900;
`;
const TitleWrapper = styled.div`
  display: flex;
`;
const TitleLine = styled.div<{ typo: any; action: any }>`
  margin-right: 24px;
  border-bottom: 2px solid ${({ action }) => (action ? colors.N100 : colors.N0)};

  ${({ typo }) =>
    css`
      ${typo}
    `};
  color: ${({ action }) => (action ? colors.N100 : colors.N40)};
`;

const TopFixed = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;

export default TopNavigation;
