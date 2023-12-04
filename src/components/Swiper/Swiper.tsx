import React, { forwardRef, useState, useEffect, useRef } from "react";

import { Swiper as OriginalSwiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Swiper = forwardRef(function Div(
  { gap = 0, index, touch, length, children }: any,
  ref: any
) {
  const handleSlideChange = (e: any) => {
    let newSwiper = e.activeIndex;
    index.setSwiperIndex(newSwiper);
  };
  const handleTouchStart = (e: any) => {
    touch.setTouch(true);
  };
  const handleTouchMove = (e: any) => {
    // console.log(e?.swipeDirection);
    if (
      e?.swipeDirection === undefined ||
      (e?.swipeDirection === "next" && index.swiperIndex === length - 1) ||
      (e?.swipeDirection === "prev" && index.swiperIndex === 0)
    ) {
      touch.setTouch(false);
    } else {
      touch.setTouch(true);
    }
  };
  const handleTouchEnd = (e: any) => {
    touch.setTouch(false);
  };

  return (
    <OriginalSwiper
      spaceBetween={gap}
      allowSlidePrev={index.swiperIndex !== 0}
      allowSlideNext={index.swiperIndex !== length - 1}
      onSlideChange={handleSlideChange}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ width: "100%", margin: 0, padding: 0 }}
    >
      {children}
    </OriginalSwiper>
  );
});

export default Swiper;
