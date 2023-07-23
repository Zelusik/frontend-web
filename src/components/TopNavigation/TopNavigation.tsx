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

const TopNavigation = forwardRef(function (
  { children, state, titleList = [], ...props }: any,
  forwardedRef
) {
  const router = useRouter();
  const scrollRef = useRef<any>(null);
  const swiperRef = useRef<any>(null);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    state.setCurrentIndex(newSwiper);
    scrollRef.current!.scrollTop = 0;
  };

  return (
    <div
      ref={scrollRef}
      style={{
        height: 844 - 50,
        overflow:
          state.topFixed && state.currentIndex === 0 ? "scroll" : "hidden",
      }}
    >
      <TitleSelection topFixed={state.topFixed}>
        <TitleWrapper>
          {titleList.map((data: any, idx: number) => {
            return (
              <TitleLine
                key={idx}
                typo={typography.Headline4}
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
      <Spacing size={30} />

      <Swiper ref={swiperRef} onSlideChange={onSlideChange}>
        {children.map((data: any, idx: number) => {
          return <SwiperSlide key={idx}>{data}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
});

const TitleSelection = styled.div<{ topFixed: any }>`
  width: 100%;
  height: 38px;
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
