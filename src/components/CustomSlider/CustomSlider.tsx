import React, { forwardRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import useDisplaySize from "hooks/useDisplaySize";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  height?: any;
  children?: any;
}

const CustomSlider = forwardRef(function Div(
  { children, index, touch, length, ...props }: any,
  ref: any
) {
  const router = useRouter();
  const { width } = useDisplaySize();

  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  var settings = {
    arrows: false,
    dots: false,
    infinite: false,

    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    touchThreshold: width,
  };

  const onTouchStart = (e: any) => {
    setStartX(e?.changedTouches[0].clientX);
    touch.setTouch(false);
  };

  const onTouchMove = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    setMoveX(e?.changedTouches[0].clientX);

    if (
      (newX < 0 && index.currentIndex === length - 1) ||
      (newX > 0 && index.currentIndex === 0)
    ) {
      touch.setTouch(true);
    }
  };

  const onTouchEnd = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    if (newX < 0 && index.currentIndex !== length - 1) {
      // next
      index.setCurrentIndex(index.currentIndex + 1);
    } else if (newX > 0 && index.currentIndex !== 0) {
      // prev
      index.setCurrentIndex(index.currentIndex - 1);
    }
    touch.setTouch(true);
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ overflow: "hidden" }}
    >
      <StyledSlider
        {...settings}
        prev={index.currentIndex === 0 && moveX - startX > 0}
        next={index.currentIndex === length - 1 && moveX - startX < 0}
        transX={(width - 30) * (length - 1)}
      >
        {children}
      </StyledSlider>
    </div>
  );
});

const NumberWrapper = styled.div`
  position: absolute;
  top: 31px;
  right: 20px;
  z-index: 800;
`;

const StyledSlider = styled(Slider)<{ prev: any; next: any; transX: any }>`
  .slick-slide {
    padding: 0 10px; // space(여백)/2
  }
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center; // 이미지가 정방향이 아닐 경우 가운데 위치
    margin: 0 -10px; // space(여백)/-2
  }
  .slick-track {
    display: flex;
    align-items: center;
    ${({ prev }) =>
      prev
        ? `
        transform: translate3d(0px, 0px, 0px) !important;
        `
        : ``}
    ${({ next, transX }) =>
      next
        ? `
        transform: translate3d(-${transX}px, 0px, 0px) !important;
        `
        : ``}
    transition: transform 200ms ease-out;
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

export default CustomSlider;
