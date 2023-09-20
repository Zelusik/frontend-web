import React, { useState, useEffect, forwardRef, useRef } from "react";
import { useRouter } from "next/router";
import { match } from "ts-pattern";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

import { colors } from "constants/colors";
import Text from "components/Text";
import Hr from "components/Hr";
import Spacing from "components/Spacing";
import HorizonalScroll from "components/HorizonalScroll/HorizonalScroll";
import SortingHeader from "pages-edit/Mark/components/SortingHeader";
import WrapperSlider from "components/CustomSlider/WrapperSlider";

interface Props {
  type: "title-scroll" | "default";
  scrollRef: any;

  index?: any;
  top?: any;
  scrollTop?: number;

  titleList: string[];
  children?: any;
}

const MarkTopNavigation = forwardRef(function Div(
  {
    type,
    scrollRef,

    index,
    touch,
    top,
    scrollTop = 0,

    titleList,
    children,
    ...props
  }: any,
  ref: any
) {
  const router = useRouter();
  const titleScrollRef = useRef<any>(null);
  const swiperScrollRef = useRef<any>(null);
  const { width } = useDisplaySize();
  const [titleTextRef, setTitleTextRef] = useState<any>(null);

  const clickTitleList = (ref: any, newIndex: number) => {
    // wrapperIndex 수정
    index.setWrapperIndex(newIndex);

    // title click -> focus on
    const textLeft = ref?.nativeEvent?.target?.offsetLeft - 20;
    const textWidth = ref?.target?.offsetWidth;
    const scrollLeft = textLeft - (width - 40 - textWidth) / 2;
    titleScrollRef.current!.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;

    if (scrollRef.current?.scrollTop > scrollTop) {
      scrollRef.current!.scrollTop = scrollTop;
    }
  };

  // swiper scroll
  const onSlideChange = (newIndex: number) => {
    index.setWrapperIndex(newIndex);

    // title click -> focus on
    const textLeft = titleTextRef?.offsetLeft - 20;
    const textWidth = titleTextRef?.offsetWidth;
    const scrollLeft = textLeft - (width - 40 - textWidth) / 2;
    titleScrollRef.current!.scrollLeft = scrollLeft < 0 ? 0 : scrollLeft;

    if (scrollRef.current?.scrollTop > scrollTop) {
      scrollRef.current!.scrollTop = scrollTop;
    }
  };

  return (
    <>
      {/* title 부분 */}
      <TitleWrapper
        topFixed={top.topFixed}
        scrollTop={match(type)
          .with("title-scroll", () => 50)
          .otherwise(() => scrollTop)}
        backgroundColor={match(type)
          .with("title-scroll", () => "MarkColor")
          .otherwise(() => "N100")}
      >
        <HorizonalScroll
          ref={titleScrollRef}
          HorPadding={match(type)
            .with("title-scroll", () => 20)
            .otherwise(() => 20)}
          gap={match(type)
            .with("title-scroll", () => 20)
            .otherwise(() => 20)}
        >
          {titleList?.map((title: string, idx: number) => {
            return (
              <TitleTextWrapper
                key={idx}
                ref={(ref: any) => {
                  if (index.wrapperIndex === idx) setTitleTextRef(ref);
                }}
                height={match(type)
                  .with("title-scroll", () => 34)
                  .otherwise(() => 34)}
                backgroundColor={
                  index.wrapperIndex === idx
                    ? match(type)
                        .with("title-scroll", () => "Orange600")
                        .otherwise(() => "N100")
                    : "N0"
                }
                onClick={(ref: any) => clickTitleList(ref, idx)}
              >
                <Text
                  typo="Headline3"
                  color={
                    index.wrapperIndex === idx
                      ? match(type)
                          .with("title-scroll", () => "Orange600")
                          .otherwise(() => "N100")
                      : "N40"
                  }
                >
                  {title}
                </Text>
              </TitleTextWrapper>
            );
          })}
        </HorizonalScroll>
        <Hr padding={20} />
      </TitleWrapper>
      {top.topFixed ? <Spacing size={35} /> : null}

      {type === "title-scroll" ? <SortingHeader count={props?.count} /> : null}
      {/* children 부분 */}
      <WrapperSlider
        index={index}
        touch={touch}
        length={titleList?.length}
        onSlideChange={onSlideChange}
      >
        {children}
      </WrapperSlider>
    </>
  );
});

const TitleWrapper = styled.div<{
  topFixed: boolean;
  scrollTop: number;
  backgroundColor: any;
}>`
  width: 100%;
  position: ${({ topFixed }) => (topFixed ? "fixed" : "static")};
  top: ${({ scrollTop }) => scrollTop}px;
  background-color: ${({ backgroundColor }) => colors[backgroundColor]};
  z-index: 900;
`;

const TitleTextWrapper = styled.div<{ height: number; backgroundColor: any }>`
  height: ${({ height }) => height}px;
  border-bottom: 2px solid ${({ backgroundColor }) => colors[backgroundColor]};
`;

export default MarkTopNavigation;
