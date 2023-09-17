import React, { useState, useEffect, forwardRef, useRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { useRouter } from "next/router";
import useDisplaySize from "hooks/useDisplaySize";
import Number from "components/Common/Number";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Props {
  height?: any;
  children?: any;
}

const ExampleCustomSlider = forwardRef(function Div(
  { children, index, touch, length, ...props }: any,
  ref: any
) {
  var settings = {
    arrows: false,
    dots: false,
    infinite: false,

    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 300,
    // variableWidth: true,
  };

  const router = useRouter();
  const { width } = useDisplaySize();

  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const onTouchStart = (e: any) => {
    setStartX(e?.changedTouches[0].clientX);
    // touch.setTouch(false);
  };

  const onTouchMove = (e: any) => {
    // const newX = e?.changedTouches[0].clientX - startX;
    setMoveX(e?.changedTouches[0].clientX);
    // if (
    //   (newX < 0 && index.wrapperIndex === length - 1) ||
    //   (newX > 0 && index.wrapperIndex === 0)
    // ) {
    //   touch.setTouch(true);
    // }
  };

  const onTouchEnd = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    if (newX < -100 && index.wrapperIndex !== length - 1) {
      // next
      index.setWrapperIndex(index.wrapperIndex + 1);
    } else if (newX > 100 && index.wrapperIndex !== 0) {
      // prev
      index.setWrapperIndex(index.wrapperIndex - 1);
    }
    // touch.setTouch(true);
  };

  useEffect(() => {
    const el = document.getElementsByClassName("slick-track")[0];
    el.classList.add("slick-wrapper-track");
  }, []);

  return (
    <>
      {/* <NumberWrapper>
        <Number index.wrapperIndex={index.wrapperIndex} length={length} />
      </NumberWrapper> */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <StyledSlider
          {...settings}
          //   className="slick-wrapper"
          touch={true}
          //   prev={true}
          prev={index.wrapperIndex === 0 && moveX - startX > 0}
          next={index.wrapperIndex === length - 1 && moveX - startX < 0}
          transX={(width - 46.8) * length - 1}
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
    ${({ touch, transX }) =>
      touch
        ? ``
        : `
        transform: translate3d(-${transX}px, 0px, 0px) !important;
        transition: transform 300ms ease-out;
        `}
    ${({ prev }) =>
      prev
        ? `
        transform: translate3d(0px, 0px, 0px) !important;
        transition: transform 300ms ease-out;
        `
        : ``}
    ${({ next, transX }) =>
      next
        ? `
        transform: translate3d(-${transX}px, 0px, 0px) !important;
        transition: transform 300ms ease-out;
        `
        : ``}
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
