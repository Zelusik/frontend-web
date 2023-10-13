import React, { forwardRef, useEffect } from "react";
import { useAppSelector } from "hooks/useReduxHooks";
import { Box, ScrollArea } from "components/core";

const ScrollTopNavigation = forwardRef(function Div(
  {
    refs,
    index,
    Y,
    direction,
    scroll = 332,
    title,
    top = 50,
    bottomHeight = 50,
    children,
  }: any,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);

  const handleTouchStart = (e: any) => {
    let scrollTop = [];
    for (let i = 1; i < refs?.length; i++) {
      scrollTop.push(refs?.[i]?.current?.scrollTop);
    }
    Y.setStartY([e?.changedTouches[0].clientY, ...scrollTop]);
  };
  const handleTouchMove = (e: any) => {
    const newMoveY = e?.changedTouches?.[0]?.clientY;
    if (newMoveY - Y.startY[0] < 0) direction.setDirection("down");
    else direction.setDirection("up");
  };

  const handleScroll = ({ scrollY }: { scrollX: number; scrollY: number }) => {
    if (scrollY < scroll) {
      for (let i = 1; i < refs?.length; i++) {
        refs?.[i].current!.style.setProperty("overflow-y", `hidden`);
      }
    } else if (scrollY >= scroll) {
      for (let i = 1; i < refs?.length; i++) {
        refs?.[i].current!.style.setProperty("overflow-y", `scroll`);
      }

      if (direction.direction === "down") {
        if (Y.startY[index.currentIndex + 1] === 0) {
          refs?.[index.currentIndex + 1].current!.scrollTo({
            top: scrollY - scroll,
          });
        }
      }
    }

    title.setTitleChange(scrollY);
    // if (scrollY > scrollTop) {
    //   title.setTitleChange(true);
    // } else {
    //   title.setTitleChange(false);
    // }
  };

  return (
    <ScrollArea
      veiwportRef={refs?.[0]}
      scroll="y"
      h={display.height - bottomHeight}
      pos="absolute"
      top={top}
      bg="N0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onScroll={handleScroll}
    >
      {children}
      <Box h={1000} />
    </ScrollArea>
  );
});

export default ScrollTopNavigation;
