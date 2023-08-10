import { globalValue } from "constants/globalValue";
import { useRef, useEffect, useCallback } from "react";
import {
  changeAction,
  changeVisible,
  changeVisibleType,
} from "reducer/slices/bottomSheet/mapBottomSheetSlice";
import { useAppDispatch } from "./useReduxHooks";

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    moveTouchY: number;
    differenceY: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
}

export default function useMapBottomSheet({ ...props }: any) {
  const dispatch = useAppDispatch();
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  const moveMapBottomSheet = useCallback((move: any) => {
    dispatch(
      changeVisible({
        type: "mapBottomSheet",
        value: move,
      })
    );
  }, []);

  const openMapBottomSheet = useCallback((type: any) => {
    dispatch(
      changeVisibleType({
        type: "mapBottomSheet",
        value: [1, type],
      })
    );
  }, []);

  const closeMapBottomSheet = useCallback((sheetInner: any) => {
    dispatch(
      changeAction({
        type: "mapBottomSheet",
        value: false,
      })
    );
    sheetInner.current!.style.setProperty("transform", `translateY(-${0}px)`);
    setTimeout(() => {
      dispatch(
        changeVisible({
          type: "mapBottomSheet",
          value: 0,
        })
      );
    }, 300);
  }, []);

  const closeMapBottomSheetQuick = useCallback(() => {
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
      differenceY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const HEIGHT = window.innerHeight;
    const BOTTOM_SHEET_HEIGHT =
      HEIGHT - 82 - globalValue.BOTTOM_NAVIGATION_HEIGHT;
    const TOP = BOTTOM_SHEET_HEIGHT * 0.7;
    const TOUCH =
      BOTTOM_SHEET_HEIGHT * 0.7 - globalValue.BOTTOM_NAVIGATION_HEIGHT;

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;

      if (
        touchStart.sheetY < touchStart.touchY &&
        touchStart.touchY < touchStart.sheetY + 20
      )
        metrics.current.isContentAreaTouched = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove, isContentAreaTouched } = metrics.current;
      touchMove.moveTouchY = e.touches[0].clientY;

      if (touchMove.prevTouchY === undefined || touchMove.prevTouchY === 0) {
        touchMove.prevTouchY = touchStart.touchY;
      }

      if (touchMove.prevTouchY > touchMove.moveTouchY) {
        touchMove.movingDirection = "up";
      }
      if (touchMove.prevTouchY < touchMove.moveTouchY) {
        touchMove.movingDirection = "down";
      }

      const currentTouchMove =
        touchMove.moveTouchY -
        HEIGHT +
        globalValue.BOTTOM_NAVIGATION_HEIGHT +
        BOTTOM_SHEET_HEIGHT * 0.3;

      let differenceY = currentTouchMove;
      let opacity = -differenceY / TOUCH;
      if (-differenceY / TOUCH > 1) opacity = 0.99;
      else if (-differenceY / TOUCH < 0) opacity = 0.01;

      if (isContentAreaTouched && differenceY < 0 && differenceY > -TOP) {
        moveMapBottomSheet(opacity);
        sheet.current!.style.setProperty(
          "transform",
          `translateY(${differenceY}px)`
        );
      } else if (!isContentAreaTouched && content.current!.scrollTop <= 0) {
        if (
          touchMove.movingDirection === "up" &&
          touchStart.sheetY > HEIGHT / 2
        ) {
          content.current?.style.setProperty("overflow-y", "hidden");
          differenceY = touchMove.moveTouchY - touchStart.touchY;
          if (differenceY > 0) return;

          opacity = -differenceY / TOUCH;
          if (-differenceY / TOUCH > 1) opacity = 0.99;
          else if (-differenceY / TOUCH < 0) opacity = 0.01;
          moveMapBottomSheet(opacity);
          sheet.current!.style.setProperty(
            "transform",
            `translateY(${differenceY}px)`
          );
        } else if (
          touchMove.movingDirection === "down" &&
          touchStart.sheetY < HEIGHT / 2
        ) {
          differenceY = -TOP - touchStart.touchY + touchMove.moveTouchY;
          if (differenceY < -TOP) return;

          opacity = -differenceY / TOUCH;
          if (-differenceY / TOUCH > 1) opacity = 0.99;
          else if (-differenceY / TOUCH < 0) opacity = 0.01;
          moveMapBottomSheet(opacity);
          sheet.current!.style.setProperty(
            "transform",
            `translateY(${differenceY}px)`
          );
        }
      }

      touchMove.differenceY = differenceY;
    };

    const open = () => {
      openMapBottomSheet("primary");
      sheet.current!.style.setProperty("transform", `translateY(${-TOP}px)`);
    };
    const close = () => {
      closeMapBottomSheet(sheet);
      sheet.current!.style.setProperty("transform", `translateY(0)`);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { touchStart, touchMove, isContentAreaTouched } = metrics.current;
      const move = touchStart.touchY - touchMove.moveTouchY;

      if (isContentAreaTouched) {
        if (
          (Math.abs(move) > 100 && TOP > touchStart.sheetY) ||
          (Math.abs(move) < 100 && TOP < touchStart.sheetY)
        ) {
          close();
          content.current!.scrollTop = 0;
        } else open();
      } else if (!isContentAreaTouched && content.current!.scrollTop <= 0) {
        if (
          touchMove.movingDirection === "up" &&
          touchStart.sheetY > HEIGHT / 2
        ) {
          if (Math.abs(move) > 50 && move > -TOP) {
            open();
            content.current?.style.setProperty("overflow-y", "scroll");
          } else close();
        } else if (
          touchMove.movingDirection === "down" &&
          touchStart.sheetY < HEIGHT / 2
        ) {
          if (Math.abs(move) > 120 && move < 0) close();
          else open();
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          moveTouchY: 0,
          differenceY: touchMove.differenceY,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      };
    };

    sheet.current!.addEventListener("touchstart", handleTouchStart);
    sheet.current!.addEventListener("touchmove", handleTouchMove);
    sheet.current!.addEventListener("touchend", handleTouchEnd);
  }, []);
  // }

  return {
    sheet,
    content,
    moveMapBottomSheet,
    openMapBottomSheet,
    closeMapBottomSheet,
    closeMapBottomSheetQuick,
  };
}
