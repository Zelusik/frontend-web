import React from "react";
import { Box as MaterialBox } from "@material-ui/core";
import { ComponentsProps } from "models/componentsModal";
import styled from "@emotion/styled";
import { coreStyles } from "../coreStyles";

type ScrollAreaProps = ComponentsProps & {
  // scroll?: "xy" | "x" | "y" | undefined;
  scroll?: boolean;
  onTouchStart?: Function;
  onTouchMove?: Function;
  onTouchEnd?: Function;
  onScroll?: any;
};

const StyledBox = styled(MaterialBox)``;

const ScrollArea = ({ children, ...props }: ScrollAreaProps) => {
  return (
    <StyledBox
      ref={props?.viewportRef}
      onTouchStart={props?.onTouchStart}
      onTouchMove={props?.onTouchMove}
      onTouchEnd={props?.onTouchEnd}
      onScroll={(e: any) =>
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
    </StyledBox>
  );
};

export default ScrollArea;
