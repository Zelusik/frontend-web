import React, { useState, useEffect, forwardRef, useRef } from "react";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

interface Props {
  index?: any;
  children?: any;
}

const Swiper = forwardRef(function Div(
  { index, children, ...props }: Props,
  ref: any
) {
  const scrollRef = useRef<any>(null);
  const { width } = useDisplaySize();
  const [prevX, setPrevX] = useState<any>(0);

  // onTouchEnd
  const onTouchEnd = () => {
    const scrollLeft = scrollRef?.current?.scrollLeft;
    const currentPrevX = prevX - scrollLeft >= 0 ? "left" : "right";
    console.log(currentPrevX);
    console.log(prevX);
    console.log(scrollLeft);

    const newIndex = Math.floor(scrollLeft / width);
    const howScroll = scrollLeft % width;
    console.log(howScroll + " " + width * 0.3 + " " + width * 0.8);
    console.log("===");

    if (currentPrevX === "right" && howScroll > width * 0.3) {
      scrollRef.current!.scrollLeft = width * (newIndex + 1);
      setPrevX(width * (newIndex + 1));
    } else if (currentPrevX === "left" && howScroll < width * 0.8) {
      scrollRef.current!.scrollLeft = width * newIndex;
      setPrevX(width * newIndex);
    } else {
      console.log("A");
      scrollRef.current!.scrollLeft = width * newIndex;
      setPrevX(width * newIndex);
    }
  };

  // swiper scroll
  function onScroll() {
    const scrollLeft = scrollRef?.current?.scrollLeft;
    // console.log(scrollLeft);

    // 일정시간(400ms) 뒤에 스크롤 동작 멈춤을 감지
    // clearTimeout(wheeling);
    // wheeling = setTimeout(() => {
    //   console.log("stop wheeling!");

    //   const newIndex = Math.floor(scrollLeft / width);
    //   const howScroll = scrollLeft % width;
    //   console.log(howScroll);

    //   if (howScroll < width * 0.3) {
    //     scrollRef.current!.scrollLeft = width * newIndex + 1;
    //   } else {
    //     scrollRef.current!.scrollLeft = width * newIndex;
    //   }
    //   wheeling = undefined;
    // }, 80);
  }
  useEffect(() => {
    scrollRef?.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef?.current?.removeEventListener("scroll", onScroll);
    };
  }, [children]);

  return (
    <SwiperWrapper ref={scrollRef} onTouchEnd={onTouchEnd}>
      <SwiperInner>{children}</SwiperInner>
    </SwiperWrapper>
  );
});

const SwiperWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
`;

const SwiperInner = styled.div`
  display: flex;
  overflow-x: auto;
`;

export default Swiper;
