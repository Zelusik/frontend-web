import React, { useEffect, forwardRef, useRef } from "react";
import styled from "@emotion/styled";
import useDisplaySize from "hooks/useDisplaySize";

interface Props {
  children?: any;
}

const Swiper = forwardRef(function Div(
  { children, ...props }: Props,
  ref: any
) {
  const scrollRef = useRef<any>(null);
  const { width } = useDisplaySize();

  //   let wheeling: number | undefined;
  function onScroll() {
    const scrollLeft = scrollRef?.current?.scrollLeft;

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

  const dragend = () => {
    console.log("A");
  };

  useEffect(() => {
    scrollRef?.current?.addEventListener("scroll", onScroll);
    return () => {
      scrollRef?.current?.removeEventListener("scroll", onScroll);
    };
  }, [children]);

  return (
    <SwiperWrapper ref={scrollRef} onDragEnd={dragend} draggable={true}>
      {children}
    </SwiperWrapper>
  );
});

const SwiperWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: auto;
`;

export default Swiper;
