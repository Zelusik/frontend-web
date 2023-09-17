import React, { useState, forwardRef, useRef } from "react";
import styled from "@emotion/styled";
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

var settings = {
  arrows: false,
  dots: false,
  infinite: false,

  slidesToShow: 1,
  slidesToScroll: false,
  speed: 300,
  // pauseOnFocus: true,
  // variableWidth: true,
};

const CustomSlider = forwardRef(function Div(
  { children, touch, length, ...props }: any,
  ref: any
) {
  const router = useRouter();
  const { width } = useDisplaySize();

  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onTouchStart = (e: any) => {
    setStartX(e?.changedTouches[0].clientX);
    touch.setTouch(false);
  };

  const onTouchMove = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    setMoveX(e?.changedTouches[0].clientX);

    if (
      (newX < 0 && currentIndex === length - 1) ||
      (newX > 0 && currentIndex === 0)
    ) {
      touch.setTouch(true);
    }
  };

  const onTouchEnd = (e: any) => {
    const newX = e?.changedTouches[0].clientX - startX;
    if (newX < 0 && currentIndex !== length - 1) {
      // next
      setCurrentIndex(currentIndex + 1);
    } else if (newX > 0 && currentIndex !== 0) {
      // prev
      setCurrentIndex(currentIndex - 1);
    }
    touch.setTouch(true);
  };

  return (
    <>
      {/* <NumberWrapper>
        <Number currentIndex={currentIndex} length={length} />
      </NumberWrapper> */}
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ overflow: "hidden" }}
      >
        <StyledSlider
          {...settings}
          prev={currentIndex === 0 && moveX - startX > 0}
          next={currentIndex === length - 1 && moveX - startX < 0}
          lastNext={(width - 40) * (length - 1)}
        >
          {children}
        </StyledSlider>
      </div>
    </>
  );
});

const NumberWrapper = styled.div`
  position: absolute;
  top: 31px;
  right: 20px;
  z-index: 800;
`;

const StyledSlider = styled(Slider)<{ prev: any; next: any; lastNext: any }>`
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
        transition: transform 300ms ease-out;
        `
        : ``}
    ${({ next, lastNext }) =>
      next
        ? `
        transform: translate3d(-${lastNext}px, 0px, 0px) !important;
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

export default CustomSlider;
