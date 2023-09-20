import React, { useState, useEffect, forwardRef, useRef } from "react";
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

const ExampleCustomSlider = forwardRef(function Div(
  { children, index, touch, length, onSlideChange, ...props }: any,
  ref: any
) {
  const router = useRouter();
  const sliderRef = useRef<any>();
  const { width } = useDisplaySize();

  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [wrapperTouch, setWrapperTouch] = useState(true);

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,

    pauseOnHover: false,
    draggable: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    swipe: touch.touch,
    touchMove: touch.touch,
  };

  const onTouchStart = (e: any) => {
    setStartX(e?.changedTouches[0].clientX);
    setStartY(e?.changedTouches[0].clientY);
  };

  const onTouchMove = (e: any) => {
    setMoveX(e?.changedTouches[0].clientX);
    setWrapperTouch(touch.touch);
  };

  const onTouchEnd = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    const newY = e?.changedTouches[0].clientY - startY;
    if (
      newY > -100 &&
      newY < 100 &&
      newX < -100 &&
      newX > -width &&
      index.wrapperIndex !== length - 1 &&
      wrapperTouch
    ) {
      // next
      onSlideChange(index.wrapperIndex + 1);
    } else if (
      newY > -100 &&
      newY < 100 &&
      newX > 100 &&
      newX < width &&
      index.wrapperIndex !== 0 &&
      wrapperTouch
    ) {
      // prev
      onSlideChange(index.wrapperIndex - 1);
    }
  };

  useEffect(() => {
    sliderRef.current.slickGoTo(index.wrapperIndex);
  }, [index.wrapperIndex]);

  useEffect(() => {
    const el = document.getElementsByClassName("slick-track")[0];
    el.classList.add("slick-wrapper-track");
    el.classList.remove("slick-track");
  }, []);

  return (
    <>
      {/* contents */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <StyledSlider
          {...settings}
          ref={sliderRef}
          touch={touch.touch}
          prev={index.wrapperIndex === 0 && moveX - startX > 0}
          next={index.wrapperIndex === length - 1 && moveX - startX < 0}
          transX={width * index.wrapperIndex}
        >
          {children}
        </StyledSlider>
      </div>
    </>
  );
});

const StyledSlider = styled(Slider)<{
  touch: any;
  prev: any;
  next: any;
  transX: any;
}>`
  .slick-list {
    height: 100%;
    object-fit: cover;
    display: flex;
    align-items: center; // 이미지가 정방향이 아닐 경우 가운데 위치
  }
  .slick-wrapper-track {
    display: flex;
    align-items: center;
    ${({ prev, transX }) =>
      prev
        ? `
        transform: translate3d(0px, 0px, 0px) !important;
        `
        : `
        `}
    ${({ next, transX }) =>
      next
        ? `
        transform: translate3d(-${transX}px, 0px, 0px) !important;
        `
        : `
        `}

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

export default ExampleCustomSlider;
