import React, { forwardRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import useDisplaySize from "@/hooks/useDisplaySize";
import { Box, Text } from "@/components/core";

import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "@/hooks/useReduxHooks";

interface InnerSliderProps {
  height?: string | number;
  index: any;
  touch: any;
  length: number;
  children?: any;
}

const InnerSlider = forwardRef(function Div(
  { height = "auto", index, touch, length, children }: InnerSliderProps,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);

  const [startX, setStartX] = useState<number>(0);
  const [moveX, setMoveX] = useState<number>(0);

  var settings = {
    arrows: false,
    dots: false,
    infinite: false,

    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    touchThreshold: 4,
    // display.width / 100
    // swipe: !(
    //   (index.currentIndex === 0 && moveX - startX > 0) ||
    //   (index.currentIndex === length - 1 && moveX - startX < 0)
    // ),
    // touchMove: !(
    //   (index.currentIndex === 0 && moveX - startX > 0) ||
    //   (index.currentIndex === length - 1 && moveX - startX < 0)
    // ),
  };

  const handleTouchStart = (e: any) => {
    // setStartX(e?.changedTouches[0].clientX);
    touch.setTouch(false);
  };
  const handleTouchMove = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    if (
      (newX < 0 && index.currentIndex === length - 1) ||
      (newX > 0 && index.currentIndex === 0)
    ) {
      touch.setTouch(true);
    }
  };
  const handleTouchEnd = (e: any) => {
    touch.setTouch(true);
    // setStartX(0);
    // setMoveX(0);
  };

  // useEffect(() => {
  //   // getElementsByClassName
  //   const els: any = document.querySelectorAll(".slick-slider");
  //   // const el: any = document.querySelectorAll(".slick-slider")[2];

  //   let startListener = (e: any) => {
  //     setStartX(e?.changedTouches[0].clientX);
  //     touch.setTouch(false);
  //     // moved = false;
  //   };
  //   let moveListener = (e: any) => {
  //     const newX = e?.changedTouches[0].clientX - startX;
  //     setMoveX(e?.changedTouches[0].clientX);
  //     if (
  //       (newX < 0 && index.currentIndex === length - 1) ||
  //       (newX > 0 && index.currentIndex === 0)
  //     ) {
  //       touch.setTouch(true);
  //     }
  //   };
  //   let endListener = () => {
  //     touch.setTouch(true);
  //     // setStartX(0);
  //     // setMoveX(0);
  //   };

  //   // // 이벤트 등록
  //   // el.addEventListener("touchstart", startListener);
  //   // el.addEventListener("touchmove", moveListener);
  //   // el.addEventListener("touchend", endListener);
  //   // // 이벤트 해제
  //   // return () => {
  //   //   el.removeEventListener("touchstart", startListener);
  //   //   el.removeEventListener("touchmove", moveListener);
  //   //   el.removeEventListener("touchend", endListener);
  //   // };

  //   // 이벤트 등록
  //   for (let i = 1; i < els.length; i++) {
  //     els?.[i].addEventListener("touchstart", startListener);
  //     els?.[i].addEventListener("touchmove", moveListener);
  //     els?.[i].addEventListener("touchend", endListener);
  //   }
  //   // 이벤트 해제
  //   return () => {
  //     for (let i = 1; i < els.length; i++) {
  //       els?.[i].removeEventListener("touchstart", startListener);
  //       els?.[i].removeEventListener("touchmove", moveListener);
  //       els?.[i].removeEventListener("touchend", endListener);
  //     }
  //   };
  // }, []);

  return (
    <Box
      onTouchStart={handleTouchStart}
      // onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        minHeight: height,
        maxHeight: height,
        overflow: "hidden",
      }}
    >
      <StyledSlider
        {...settings}
        afterChange={(newIndex: number) => {
          index.setCurrentIndex(newIndex);
        }}
      >
        {children}
      </StyledSlider>
    </Box>
  );
});

const StyledSlider = styled(Slider)`
  .slick-slide {
    padding: 0 10px; // space(여백)/2
  }
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center;
    //align-els: center; // 이미지가 정방향이 아닐 경우 가운데 위치
    margin: 0 -10px; // space(여백)/-2
  }
  .slick-track {
    display: flex;
    align-items: center;
    // align-els: center;
  }
  .slick-prev {
    left: 6px;
    z-index: 999;
  }
  .slick-next {
    right: 6px;
    z-index: 999;
  }
`;

// ${({ prev }) =>
// prev
//   ? `
//     transform: translate3d(0px, 0px, 0px) !important;
//   `
//   : ``}
// ${({ next, transX }) =>
// next
//   ? `
//     transform: translate3d(-${transX}px, 0px, 0px) !important;
//   `
//   : ``}

export default InnerSlider;
