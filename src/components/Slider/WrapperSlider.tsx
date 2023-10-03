import React, { useState, useEffect, forwardRef, useRef } from "react";
import { Box } from "@mantine/core";
import styled from "@emotion/styled";
import { useAppSelector } from "hooks/useReduxHooks";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface WrapperSliderProps {
  height?: number;
  index: any;
  touch: any;
  length: number;
  handleSlide: () => void;
  children: any;
}

const WrapperSlider = forwardRef(function Div(
  { height, index, touch, length, handleSlide, children }: WrapperSliderProps,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);

  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,

    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 200,
    touchThreshold: 6,

    swipe: touch?.touch,
    touchMove: touch?.touch,
  };

  const handleTouchStart = (e: any) => {
    setStartX(e?.changedTouches[0].clientX);
  };
  const handleTouchMove = (e: any) => {
    setMoveX(e?.changedTouches[0].clientX);
  };

  useEffect(() => {
    console.log("A");
    ref.current.slickGoTo(index.wrapperIndex);
  }, [index.wrapperIndex]);

  useEffect(() => {
    const el = document.getElementsByClassName("slick-track")[0];
    el.classList.add("slick-wrapper-track");
    el.classList.remove("slick-track");
  }, []);

  return (
    // <Box onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
    <StyledSlider
      {...settings}
      ref={ref}
      // prev={index.wrapperIndex === 0 && moveX - startX > 0}
      // next={index.wrapperIndex === length - 1 && moveX - startX < 0}
      // transX={width * index.wrapperIndex}
      afterChange={(newIndex: number) => {
        handleSlide();
        index.setWrapperIndex(newIndex);
      }}
      style={{ width: display.width }}
    >
      {children}
    </StyledSlider>
    // </Box>
  );
});

const StyledSlider = styled(Slider)`
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center; // 이미지가 정방향이 아닐 경우 가운데 위치
  }
  .slick-wrapper-track {
    display: flex;
    align-items: center;
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

export default WrapperSlider;
