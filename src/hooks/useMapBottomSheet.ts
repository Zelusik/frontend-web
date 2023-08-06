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

  if (props.use) {
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
      const HEIGHT = window.innerHeight;
      const BOTTOM_SHEET_HEIGHT =
        HEIGHT - 82 - globalValue.BOTTOM_NAVIGATION_HEIGHT;
      const TOP = BOTTOM_SHEET_HEIGHT * 0.7;
      const TOUCH =
        BOTTOM_SHEET_HEIGHT * 0.7 - globalValue.BOTTOM_NAVIGATION_HEIGHT;

      const BOTTOM_SHEET_BACKGROUND = 82 + BOTTOM_SHEET_HEIGHT * 0.7;

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

        if (
          isContentAreaTouched &&
          currentTouchMove < 0 &&
          currentTouchMove > -TOP
        ) {
          let opacity = -currentTouchMove / TOUCH;
          if (-currentTouchMove / TOUCH > 1) opacity = 0.99;
          else if (-currentTouchMove / TOUCH < 0) opacity = 0.01;

          moveMapBottomSheet(opacity);
          sheet.current!.style.setProperty(
            "transform",
            `translateY(${currentTouchMove}px)`
          );
        } else if (!isContentAreaTouched && content.current!.scrollTop <= 0) {
          let move_pre = 0;
          let move =
            touchMove.moveTouchY -
            HEIGHT +
            globalValue.BOTTOM_NAVIGATION_HEIGHT +
            BOTTOM_SHEET_HEIGHT * 0.3;
          // if (TOP < touchStart.sheetY) {
          //   move_pre =
          //     BOTTOM_SHEET_BACKGROUND -
          //     HEIGHT +
          //     globalValue.BOTTOM_NAVIGATION_HEIGHT +
          //     BOTTOM_SHEET_HEIGHT * 0.3;
          // } else {
          //   move =
          //     82 -
          //     HEIGHT +
          //     globalValue.BOTTOM_NAVIGATION_HEIGHT +
          //     BOTTOM_SHEET_HEIGHT * 0.3;
          // }
          // console.log(move - move_pre);

          let opacity = -currentTouchMove / TOUCH;
          if (-currentTouchMove / TOUCH > 1) opacity = 0.99;
          else if (-currentTouchMove / TOUCH < 0) opacity = 0.01;

          if (touchMove.movingDirection === "up" && TOP < touchStart.sheetY) {
            moveMapBottomSheet(opacity);
            sheet.current!.style.setProperty(
              "transform",
              `translateY(${move}px)`
            );
            content.current?.style.setProperty("overflow-y", "hidden");
          } else if (touchMove.movingDirection === "down") {
            moveMapBottomSheet(opacity);
            sheet.current!.style.setProperty(
              "transform",
              `translateY(${move}px)`
            );
          }
        }
      };

      const handleTouchEnd = (e: TouchEvent) => {
        // document.body.style.overflowY = "auto";
        const { touchStart, touchMove, isContentAreaTouched } = metrics.current;
        const move = touchStart.touchY - touchMove.moveTouchY;

        if (isContentAreaTouched) {
          if (
            (Math.abs(move) > 100 && TOP > touchStart.sheetY) ||
            (Math.abs(move) < 100 && TOP < touchStart.sheetY)
          ) {
            closeMapBottomSheet(sheet);
            props.handleClickFilter();
            content.current!.scrollTop = 0;
            sheet.current!.style.setProperty("transform", `translateY(0)`);
          } else {
            openMapBottomSheet("primary");
            sheet.current!.style.setProperty(
              "transform",
              `translateY(${-TOP}px)`
            );
          }
        } else if (!isContentAreaTouched && content.current!.scrollTop <= 0) {
          if (touchMove.movingDirection === "up") {
            openMapBottomSheet("primary");
            sheet.current!.style.setProperty(
              "transform",
              `translateY(${-TOP}px)`
            );
            content.current?.style.setProperty("overflow-y", "scroll");
          } else if (touchMove.movingDirection === "down") {
            closeMapBottomSheet(sheet);
            props.handleClickFilter();
            sheet.current!.style.setProperty("transform", `translateY(0)`);
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
            movingDirection: "none",
          },
          isContentAreaTouched: false,
        };
      };

      sheet.current!.addEventListener("touchstart", handleTouchStart);
      sheet.current!.addEventListener("touchmove", handleTouchMove);
      sheet.current!.addEventListener("touchend", handleTouchEnd);
    }, []);
  }

  return {
    sheet,
    content,
    moveMapBottomSheet,
    openMapBottomSheet,
    closeMapBottomSheet,
    closeMapBottomSheetQuick,
  };
}
