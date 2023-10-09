import React, { forwardRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import { useAppSelector } from "hooks/useReduxHooks";

import { colors } from "constants/colors";
import { Box, Divider, ScrollArea, Text } from "components/core";
import { globalValue } from "constants/globalValue";

const ScrollTopNavigation = forwardRef(function Div(
  {
    refs,
    height,
    padding,
    gap,
    color = "N100",
    index,
    touch,
    keywordDatas,
    children,
  }: any,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);

  const handleTouchStart = (e: any) => {
    // setStartY(e?.changedTouches[0].clientY);
    // setStartY1(scrollRef1?.current?.scrollTop);
    // setStartY2(scrollRef2?.current?.scrollTop);
  };
  const handleTouchMove = (e: any) => {
    const newMoveY = e?.changedTouches?.[0]?.clientY;
    // if (newMoveY - startY < 0) setDirection("down");
    // else setDirection("up");
  };

  const handleScroll = ({ scrollY }: { scrollX: number; scrollY: number }) => {
    if (scrollY < 332) {
      refs?.scrollRef1.current!.style.setProperty("overflow-y", `hidden`);
      refs?.scrollRef2.current!.style.setProperty("overflow-y", `hidden`);
    } else if (scrollY >= 332) {
      refs?.scrollRef1.current!.style.setProperty("overflow-y", `scroll`);
      refs?.scrollRef2.current!.style.setProperty("overflow-y", `scroll`);

      //   if (direction === "down") {
      //     if (currentIndex === 0 && startY1 === 0) {
      //       refs?.scrollRef1.current!.scrollTo({
      //         top: scrollY - 332,
      //       });
      //     } else if (startY2 === 0) {
      //       refs?.scrollRef2.current!.scrollTo({
      //         top: scrollY - 332,
      //       });
      //     }
      //   }
    }

    // if (scrollY > 10) {
    //   setTitleChange(true);
    // } else {
    //   setTitleChange(false);
    // }
  };

  return (
    <ScrollArea
      veiwportRef={refs?.scrollRef}
      h={height - 50 - globalValue.BOTTOM_NAVIGATION_HEIGHT}
      pos="absolute"
      top={50}
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
