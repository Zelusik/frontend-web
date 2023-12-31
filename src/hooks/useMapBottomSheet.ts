import { globalValue } from "constants/globalValue";
import { useRef, useEffect, useCallback } from "react";
import {
  changeAuto,
  changeMapAction,
  changeMapVisible,
  changeMapVisibleType,
} from "reducer/slices/bottomSheet/mapBottomSheetSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import useSearch from "./useSearch";

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
  const { handleFilterVisible, updateNewSelection, deleteStore } = useSearch();

  const moveMapBottomSheet = useCallback((move: any) => {
    dispatch(
      changeMapVisible({
        type: "mapBottomSheet",
        value: move,
      })
    );
    dispatch(
      changeAuto({
        type: "mapBottomSheet",
        value: "none",
      })
    );
  }, []);

  const openMapBottomSheet = useCallback(
    (type: any, sheetInner: any, height: any, popstate?: any) => {
      if (!popstate)
        history.pushState({ page: "modal" }, document.title, "map-modal");
      setTimeout(() => {
        dispatch(
          changeMapVisibleType({
            type: "mapBottomSheet",
            value: [1, type],
          })
        );
      }, 200);
      sheetInner?.current?.style.setProperty(
        "transform",
        `translateY(${-height}px)`
      );
      dispatch(
        changeAuto({
          type: "mapBottomSheet",
          value: "up",
        })
      );
    },
    []
  );

  const closeMapBottomSheet = useCallback((sheetInner: any, popstate?: any) => {
    handleFilterVisible(false);
    updateNewSelection();
    dispatch(
      changeMapAction({
        type: "mapBottomSheet",
        value: false,
      })
    );
    sheetInner?.current?.style.setProperty("transform", `translateY(-${0}px)`);
    setTimeout(() => {
      if (!popstate) history.back();
      dispatch(
        changeMapVisible({
          type: "mapBottomSheet",
          value: 0,
        })
      );
    }, 300);
    dispatch(
      changeAuto({
        type: "mapBottomSheet",
        value: "down",
      })
    );
  }, []);

  const closeMapBottomSheetQuick = useCallback(
    (sheetInner: any, popstate?: any) => {
      handleFilterVisible(false);
      updateNewSelection();
      dispatch(
        changeMapAction({
          type: "mapBottomSheet",
          value: false,
        })
      );
      sheetInner?.current?.style.setProperty(
        "transform",
        `translateY(-${0}px)`
      );
      dispatch(
        changeMapVisible({
          type: "mapBottomSheet",
          value: 0,
        })
      );
      dispatch(
        changeAuto({
          type: "mapBottomSheet",
          value: "down",
        })
      );
    },
    []
  );

  const openMapBottomSheetStore = useCallback((sheetInner: any) => {
    deleteStore();
    sheetInner?.current?.style.setProperty("transform", `translateY(${0}px)`);
  }, []);

  const closeMapBottomSheetStore = useCallback(
    (sheetInner: any, height: any) => {
      const BOTTOM_SHEET_HEIGHT =
        height - (82 + globalValue.BOTTOM_NAVIGATION_HEIGHT);
      sheetInner?.current?.style.setProperty(
        "transform",
        `translateY(${BOTTOM_SHEET_HEIGHT * 0.3}px)`
      );
    },
    []
  );

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
    if (!props.use) return;
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
        let opacityFixed = Number(opacity.toFixed(2));
        if ((opacityFixed * 100) % 10 === 0) moveMapBottomSheet(opacityFixed);
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
          if (differenceY < -TOP) return;

          opacity = -differenceY / TOUCH;
          if (-differenceY / TOUCH > 1) opacity = 0.99;
          else if (-differenceY / TOUCH < 0) opacity = 0.01;
          let opacityFixed = Number(opacity.toFixed(2));
          if ((opacityFixed * 100) % 10 === 0) moveMapBottomSheet(opacityFixed);

          sheet.current!.style.setProperty(
            "transform",
            `translateY(${differenceY}px)`
          );
        } else if (
          touchMove.movingDirection === "down" &&
          touchStart.sheetY < HEIGHT / 2
        ) {
          differenceY = -TOP - touchStart.touchY + touchMove.moveTouchY;
          if (differenceY > 0) return;

          opacity = -differenceY / TOUCH;
          if (-differenceY / TOUCH > 1) opacity = 0.99;
          else if (-differenceY / TOUCH < 0) opacity = 0.01;
          let opacityFixed = Number(opacity.toFixed(2));
          if ((opacityFixed * 100) % 10 === 0) moveMapBottomSheet(opacityFixed);

          sheet.current!.style.setProperty(
            "transform",
            `translateY(${differenceY}px)`
          );
        }
      }

      touchMove.differenceY = differenceY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { touchStart, touchMove, isContentAreaTouched } = metrics.current;
      const move = touchStart.touchY - touchMove.moveTouchY;

      if (isContentAreaTouched) {
        if (Math.abs(move) > 100 && TOP > touchStart.sheetY) {
          closeMapBottomSheet(sheet);
          content.current?.style.setProperty("overflow-y", "hidden");
          content.current!.scrollTop = 0;
        } else if (Math.abs(move) < 100 && TOP < touchStart.sheetY) {
          closeMapBottomSheet(sheet, true);
          content.current?.style.setProperty("overflow-y", "hidden");
          content.current!.scrollTop = 0;
        } else if (Math.abs(move) < 100 && TOP > touchStart.sheetY) {
          openMapBottomSheet("primary", sheet, TOP, true);
          content.current?.style.setProperty("overflow-y", "scroll");
        } else {
          openMapBottomSheet("primary", sheet, TOP);
          content.current?.style.setProperty("overflow-y", "scroll");
        }
      } else if (!isContentAreaTouched && content.current!.scrollTop <= 0) {
        if (
          touchMove.movingDirection === "up" &&
          touchStart.sheetY > HEIGHT / 2
        ) {
          if (Math.abs(move) > 50 && move > -TOP) {
            openMapBottomSheet("primary", sheet, TOP);
            content.current?.style.setProperty("overflow-y", "scroll");
          } else {
            closeMapBottomSheet(sheet, true);
            content.current?.style.setProperty("overflow-y", "hidden");
          }
        } else if (
          touchMove.movingDirection === "down" &&
          touchStart.sheetY < HEIGHT / 2
        ) {
          if (Math.abs(move) > 120 && move < 0) {
            closeMapBottomSheet(sheet);
            content.current?.style.setProperty("overflow-y", "hidden");
          } else {
            openMapBottomSheet("primary", sheet, TOP, true);
          }
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

    sheet?.current?.addEventListener("touchstart", handleTouchStart);
    sheet?.current?.addEventListener("touchmove", handleTouchMove);
    sheet?.current?.addEventListener("touchend", handleTouchEnd);
  }, []);

  return {
    sheet,
    content,

    moveMapBottomSheet,
    openMapBottomSheet,
    closeMapBottomSheet,
    closeMapBottomSheetQuick,

    openMapBottomSheetStore,
    closeMapBottomSheetStore,
  };
}
