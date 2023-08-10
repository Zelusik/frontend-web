import { useRef, useEffect, useCallback } from "react";
import {
  changeAction,
  changeVisible,
  changeVisibleType,
} from "reducer/slices/bottomSheet/bottomSheetSlice";
import { useAppDispatch } from "./useReduxHooks";

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    moveTouchY: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
}

export default function useBottomSheet({ ...props }: any) {
  const dispatch = useAppDispatch();
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const moveBottomSheet = useCallback((move: any) => {
    dispatch(
      changeVisible({
        type: "bottomSheet",
        value: move,
      })
    );
  }, []);

  const openBottomSheet = useCallback((type: any) => {
    dispatch(
      changeVisibleType({
        type: "bottomSheet",
        value: [1, type],
      })
    );
  }, []);

  const closeBottomSheet = useCallback((sheetInner: any) => {
    dispatch(
      changeAction({
        type: "bottomSheet",
        value: false,
      })
    );
    sheetInner.current?.style.setProperty("transform", `translateY(-${0}px)`);
    setTimeout(() => {
      dispatch(
        changeVisible({
          type: "bottomSheet",
          value: 0,
        })
      );
    }, 300);
  }, []);

  const closeBottomSheetQuick = useCallback(() => {
    dispatch(
      changeVisible({
        type: "bottomSheet",
        value: 0,
      })
    );
  }, []);

  // if (props.use) {
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      moveTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const BOTTOMSHEET_BACKGROUND = window.innerHeight - props.BOTTOMSHEET_HEIGHT;

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current?.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;

      if (
        touchStart.sheetY < touchStart.touchY &&
        touchStart.touchY < touchStart.sheetY + 20
      )
        metrics.current.isContentAreaTouched = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove, isContentAreaTouched } = metrics.current;
      const currentTouch = e.touches[0].clientY;
      touchMove.moveTouchY = currentTouch;
      const currentTouchMove = touchMove.moveTouchY - BOTTOMSHEET_BACKGROUND;

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY > touchMove.moveTouchY) {
        touchMove.movingDirection = "up";
      }
      if (touchMove.prevTouchY < touchMove.moveTouchY) {
        touchMove.movingDirection = "down";
      }

      if (isContentAreaTouched && currentTouchMove > 0) {
        e.preventDefault();
        document.body.style.overflowY = "hidden";

        moveBottomSheet(
          -(currentTouchMove - props.BOTTOMSHEET_HEIGHT) / props.BOTTOMSHEET_HEIGHT
        );
        sheet.current?.style.setProperty(
          "transform",
          `translateY(${currentTouchMove - props.BOTTOMSHEET_HEIGHT}px)`
        );
      } else if (
        content.current?.scrollTop <= 0 &&
        touchMove.movingDirection === "down"
      ) {
        const move = touchMove.moveTouchY - touchStart.touchY;

        sheet.current?.style.setProperty(
          "transform",
          `translateY(${move - props.BOTTOMSHEET_HEIGHT}px)`
        );
        moveBottomSheet(
          -(move - props.BOTTOMSHEET_HEIGHT) / props.BOTTOMSHEET_HEIGHT
        );
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = "auto";
      const { touchMove, isContentAreaTouched } = metrics.current;
      const currentTouchMove = touchMove.moveTouchY - BOTTOMSHEET_BACKGROUND;

      if (isContentAreaTouched) {
        e.preventDefault();
        if (currentTouchMove > props.BOTTOMSHEET_HEIGHT * 0.2) {
          closeBottomSheet(sheet);
          sheet.current?.style.setProperty("transform", `translateY(0)`);
        } else {
          sheet.current?.style.setProperty(
            "transform",
            `translateY(${-props.BOTTOMSHEET_HEIGHT}px)`
          );
        }
      } else if (
        content.current?.scrollTop <= 0 &&
        touchMove.movingDirection === "down"
      ) {
        closeBottomSheet(sheet);
        sheet.current?.style.setProperty("transform", `translateY(0)`);
      }

      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          moveTouchY: 0,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      };
    };

    sheet.current?.addEventListener("touchstart", handleTouchStart);
    sheet.current?.addEventListener("touchmove", handleTouchMove);
    sheet.current?.addEventListener("touchend", handleTouchEnd);
  }, []);
  // }

  return {
    sheet,
    content,
    moveBottomSheet,
    openBottomSheet,
    closeBottomSheet,
    closeBottomSheetQuick,
  };
}
