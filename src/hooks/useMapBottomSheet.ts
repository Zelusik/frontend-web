import { globalValue } from "constants/globalValue";
import { useRef, useEffect } from "react";

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
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
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

        props.handleMove(opacity);
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
          props.handleMove(opacity);
          sheet.current!.style.setProperty(
            "transform",
            `translateY(${move}px)`
          );
          content.current?.style.setProperty("overflow-y", "hidden");
        } else if (touchMove.movingDirection === "down") {
          props.handleMove(opacity);
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
          props.handleClickBackground();
          content.current!.scrollTop = 0;
          sheet.current!.style.setProperty("transform", `translateY(0)`);
        } else {
          props.handleClickShow();
          sheet.current!.style.setProperty(
            "transform",
            `translateY(${-TOP}px)`
          );
        }
      } else if (!isContentAreaTouched && content.current!.scrollTop <= 0) {
        if (touchMove.movingDirection === "up") {
          props.handleClickShow();
          sheet.current!.style.setProperty(
            "transform",
            `translateY(${-TOP}px)`
          );
          content.current?.style.setProperty("overflow-y", "scroll");
        } else if (touchMove.movingDirection === "down") {
          props.handleClickBackground();
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

  return { sheet, content };
}
