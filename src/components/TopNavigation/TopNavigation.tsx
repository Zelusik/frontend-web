import React, { forwardRef, useRef, useState } from "react";
import { useRouter } from "next/router";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { match } from "ts-pattern";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Hr from "components/Hr";
import Spacing from "components/Spacing";
import { colors } from "constants/colors";
import { typography } from "constants/typography";

const TopNavigation = forwardRef(function (
  {
    children,
    type = "store-detail",
    scrollRef,
    scrollTop,
    titleList = [],
    ...props
  }: any,
  ref
) {
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  const onSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    props.setCurrentIndex(newSwiper);

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
          .otherwise(() => 38)}
        topFixed={props.topFixed}
      >
        <TitleWrapper
          height={match(type)
            .with("store-detail", () => 37)
            .with("search-place", () => 33)
            .with("mypage", () => 34)
            .otherwise(() => 37)}
        >
          {titleList.map((data: any, idx: number) => {
            return (
              <TitleLine
                key={idx}
                action={idx === props.currentIndex}
                typo={match(type)
                  .with("store-detail", () => "Headline4")
                  .with("search-place", () => "Headline3")
                  .with("mypage", () => "Headline3")
                  .otherwise(() => "Headline4")}
                onClick={() => {
                  props.setCurrentIndex(idx);
                  const middle = props.currentIndex - idx;
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
      {props.topFixed && (
        <TopFixed
          height={match(type)
            .with("store-detail", () => 38)
            .with("search-place", () => 34)
            .with("mypage", () => 35)
            .otherwise(() => 38)}
        />
      )}
      <Spacing
        size={match(type)
          .with("store-detail", () => 30)
          .with("search-place", () => 0)
          .with("mypage", () => 20)
          .otherwise(() => 30)}
      />

      <Swiper
        ref={swiperRef}
        allowSlidePrev={props.currentIndex !== 0}
        allowSlideNext={props.currentIndex !== children.length - 1}
        onSlideChange={onSlideChange}
      >
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
const TitleWrapper = styled.div<{ height: number }>`
  height: ${({ height }) => height + "px"};
  display: flex;
`;
const TitleLine = styled.div<{ typo: any; action: any }>`
  margin-right: 24px;
  border-bottom: 2px solid ${({ action }) => (action ? colors.N100 : colors.N0)};

  ${({ typo }) =>
    css`
      ${typography[typo]}
    `};
  color: ${({ action }) => (action ? colors.N100 : colors.N40)};
`;

const TopFixed = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;

export default TopNavigation;
