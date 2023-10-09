import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import styled from "@emotion/styled";
import { coreStyles } from "../coreStyles";

export interface onScrollProps {
  scrollX: number;
  scrollY: number;
}

type ScrollAreaProps = ComponentsProps & {
  // scroll?: "xy" | "x" | "y" | undefined;
  scroll?: boolean;
  onScroll?: any;
};

const StyledBox = styled(MaterialBox)``;

const ScrollArea = ({ children, ...props }: ScrollAreaProps) => {
  return (
    <div
      ref={props?.veiwportRef}
      onTouchStart={props?.onTouchStart}
      onTouchMove={props?.onTouchMove}
      onTouchEnd={props?.onTouchEnd}
      onClick={props?.onClick}
      onScroll={(e: any) =>
        props?.onScroll &&
        props?.onScroll({
          scrollX: e?.target?.scrollLeft,
          scrollY: e?.target?.scrollTop,
        })
      }
      style={{
        ...coreStyles(props),
        overflow: "scroll",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollArea;
