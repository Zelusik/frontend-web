import React, { forwardRef, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Hr from "components/Hr";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import { typography } from "constants/typography";
import { css } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useDisplaySize from "hooks/useDisplaySize";
import { match } from "ts-pattern";

const TopNavigation = forwardRef(function (
  { children, type = "store-detail", state, titleList = [], ...props }: any,
  forwardedRef
) {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const swiperRef = useRef<any>(null);
  const { height } = useDisplaySize();

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    state.setCurrentIndex(newSwiper);
    scrollRef.current!.scrollTop = 0;
  };

  return (
    <div
      ref={scrollRef}
      style={{
        height: type === "store-detail" ? height - 50 : height - 126,
        overflow:
          type === "store-detail"
            ? state.topFixed && state.currentIndex === 0
              ? "scroll"
              : "hidden"
            : "scroll",
      }}
    >
      <TitleSelection
        height={match(type)
          .with("store-detail", () => 38)
          .with("search-place", () => 34)
          .exhaustive()}
        topFixed={state.topFixed}
      >
        <TitleWrapper>
          {titleList.map((data: any, idx: number) => {
            return (
              <TitleLine
                key={idx}
                typo={match(type)
                  .with("store-detail", () => typography.Headline4)
                  .with("search-place", () => typography.Headline3)
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
      {state.topFixed && <div style={{ height: 38 }} />}
      <Spacing
        size={match(type)
          .with("store-detail", () => 30)
          .with("search-place", () => 0)
          .exhaustive()}
      />

      <Swiper ref={swiperRef} onSlideChange={onSlideChange}>
        {children.map((data: any, idx: number) => {
          return <SwiperSlide key={idx}>{data}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
});

const TitleSelection = styled.div<{ height: number; topFixed: any }>`
  width: 100%;
  height: ${({ height }) => height + "px"};
  padding: 0 20px;

  position: ${({ topFixed }) => (topFixed ? "fixed" : "relative")};
  top: ${({ topFixed }) => (topFixed ? "50px" : "0")};
  background-color: ${colors.N0};
  z-index: 999;
`;
const TitleWrapper = styled.div`
  height: 36px;
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

export default TopNavigation;
