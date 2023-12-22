import React, { forwardRef, useEffect } from "react";
import { useAppSelector } from "@/hooks/useReduxHooks";

import { ScrollArea } from "@/components/core";
import { globalValue } from "@/constants/globalValue";

const InnerTopNavigation = forwardRef(function Div(
  {
    scrollRef,
    innerScrollRef,
    scroll,
    padding,
    bottomHeight = 50,
    direction,
    children,
  }: any,
  ref: any
) {
  const { display } = useAppSelector((state) => state.global);

  const handleTouchMove = () => {
    if (
      direction === "up" &&
      scrollRef?.current?.scrollTop >= scroll &&
      innerScrollRef?.current?.scrollTop === 0
    ) {
      scrollRef.current!.scrollTo({ top: scroll });
    }
  };

  return (
    <ScrollArea
      veiwportRef={innerScrollRef}
      ph={padding}
      h={display.height - bottomHeight}
      style={{ overflow: "hidden" }}
      onTouchMove={handleTouchMove}
    >
      {children}
    </ScrollArea>
  );
});

export default InnerTopNavigation;
