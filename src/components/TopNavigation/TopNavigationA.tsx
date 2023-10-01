import React, { forwardRef, useEffect, useRef } from "react";
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
import SortingHeader from "view/Mark/components/StoreCount";

const TopNavigation = forwardRef(function Div(
  {
    children,
    type = "store-detail",
    scrollRef,
    scrollTop,
    titleList = [],
    ...props
  }: any,
  ref: any
) {
  const router = useRouter();
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(props.currentIndex);
    }
  }, [props.currentIndex]);

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
          .otherwise(() => 35)}
        padding={match(type)
          .with("mark", () => 0)
          .otherwise(() => 0)}
        top={match(type)
          .with("search-place", () => 126)
          .otherwise(() => 50)}
        topFixed={props.topFixed}
        background={match(type)
          .with("mark", () => "#fbfbfb")
          .otherwise(() => colors.N0)}
      >
        <TitleWrapper
          height={match(type)
            .with("store-detail", () => 37)
            .otherwise(() => 34)}
        >
          {titleList.map((data: any, idx: number) => {
            return (
              // <div key={idx}></div>
              <TitleLine
                key={idx}
                act={idx === props.currentIndex}
                color={match(type)
                  .with("mark", () => colors.Orange600)
                  .otherwise(() => colors.N100)}
                typo={match(type)
                  .with("store-detail", () => "Headline4")
                  .otherwise(() => "Headline3")}
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
        <div style={{ padding: "0 20px" }}>
          <Hr />
        </div>
      </TitleSelection>
      {props.topFixed && (
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
      {type === "mark" ? <SortingHeader count={props.count} /> : null}

      <Swiper
        ref={swiperRef}
        allowSlidePrev={props.currentIndex > 0}
        allowSlideNext={props.currentIndex !== children?.length - 1}
        onSlideChange={onSlideChange}
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
