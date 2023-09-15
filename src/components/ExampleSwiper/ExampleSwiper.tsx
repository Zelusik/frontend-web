"use client";
import { forwardRef, useState, useRef } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import useDisplaySize from "hooks/useDisplaySize";

interface Props {
  children?: any;
}

const ExampleSwiper = forwardRef(function Div(
  { children, index, ...props }: any,
  ref: any
) {
  const swiperRef = useRef<any>();
  const { width } = useDisplaySize();
  const [startX, setStartX] = useState(0);
  const [moveX, setMoveX] = useState(0);

  const onTouchStart = (e: any) => {
    setStartX(e?.changedTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    if (
      e?.changedTouches[0].clientX - startX < -80 &&
      index.currentIndex !== children.length - 1
    ) {
      setMoveX(
        -width * index.currentIndex + (e?.changedTouches[0].clientX - width)
      );
    } else if (
      e?.changedTouches[0].clientX - startX > 80 &&
      index.currentIndex !== 0
    ) {
      setMoveX(-width * index.currentIndex + e?.changedTouches[0].clientX);
    }
  };

  const onTouchEnd = (e: any) => {
    // index.setCurrentIndex(index.currentIndex + 1);
    // setMoveX(-width * (index.currentIndex + 1));
    if (
      e?.changedTouches[0].clientX - startX < -80 &&
      index.currentIndex !== children.length - 1
    ) {
      index.setCurrentIndex(index.currentIndex + 1);
      setMoveX(-width * (index.currentIndex + 1));
    } else if (
      e?.changedTouches[0].clientX - startX > 80 &&
      index.currentIndex !== 0
    ) {
      index.setCurrentIndex(index.currentIndex - 1);
      setMoveX(-width * (index.currentIndex - 1));
    }
  };

  const glowVariants = {
    initial: {
      x: 0,
    },
    hover: {
      x: moveX,
    },
  };

  return (
    <motion.div
      ref={swiperRef}
      //   initial="initial"
      //   whileHover="hover"
      //   variants={glowVariants}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        display: "flex",
        // transform: `translateX(-500px)`,
        transform: `translateX(${moveX}px)`,
        transition: `transform 200ms ease-out`,
      }}
    >
      {children}
    </motion.div>
  );
});

const fade = (actionDelay: boolean) => keyframes`
  from {
    opacity: ${actionDelay ? 0 : 0.7};
  }
  to {
    opacity: ${actionDelay ? 0.7 : 0};
  }
`;

const slide = (actionDelay: number, height: number) => keyframes`
  from {
    transform: translateY(${actionDelay ? 0 : -height + "px"});
  }
  to {
    transform: translateY(${actionDelay ? -height + "px" : 0});
  }
`;

const Wrapper = styled.div`
  display: flex;
`;

const Inner = styled.div<{ width: number }>`
  min-width: ${({ width }) => width}px;
`;

//   width: 100%;
//   height: ${({ height }) => height + "px"};

//   display: flex;
//   flex-direction: column;

//   position: fixed;
//   bottom: ${({ height }) => -height + "px"}; // -height

//   border-radius: 16px 16px 0 0;
//   color: ${({ color }) => color};
//   background-color: ${colors.N0};
//   z-index: 999;

//   transition: transform 300ms ease-out;

//   ${({ height, actionDelay, visible }) =>
//     visible === 1
//       ? css`
//           animation: ${slide(actionDelay, height)} 300ms forwards;
//         `
//       : css``}

export default ExampleSwiper;
