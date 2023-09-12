import { globalValue } from "constants/globalValue";
import { useRef, useEffect, useCallback } from "react";
import { useAppDispatch } from "./useReduxHooks";
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
}

export default function useMapStoreDetail({ ...props }: any) {
  const dispatch = useAppDispatch();
  const sheet = useRef<HTMLDivElement>(null);
  const { deleteStore } = useSearch();

  const allOpenMapStoreDetail = useCallback((sheetInner: any, height: any) => {
    if (location.pathname !== "/map-store-detail")
      history.pushState({ page: "modal" }, document.title, "map-store-detail");
    sheetInner.current!.style.setProperty(
      "transform",
      `translateY(-${height}px)`
    );
  }, []);

  const openMapStoreDetail = useCallback(
    (sheetInner: any, height: any, popstate?: any, pathname?: any) => {
      if (!popstate) {
        history.back();
      } else if (pathname !== "/map-store-detail-modal") {
        history.pushState(
          { page: "modal" },
          document.title,
          "map-store-detail-modal"
        );
      }
      sheetInner.current!.style.setProperty(
        "transform",
        `translateY(${-height * 0.3}px)`
      );
    },
    []
  );

  const closeMapStoreDetail = useCallback((sheetInner: any, popstate?: any) => {
    if (!popstate) history.back();
    sheetInner.current!.style.setProperty("transform", `translateY(0)`);
    deleteStore();
  }, []);

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
  });

  useEffect(() => {
    if (!props.use) return;
    const HEIGHT = window.innerHeight;

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
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

      const TOP =
        location.pathname === "/map-store-detail" ? HEIGHT : HEIGHT * 0.3;

      let differenceY = touchMove.moveTouchY - touchStart.touchY - TOP;
      //   console.log(differenceY > -TOP);
      if (
        (location.pathname === "/map-store-detail" && differenceY < -TOP) ||
        (location.pathname === "/map-store-detail-modal" && differenceY > -TOP)
      ) {
        return;
      }

      sheet.current!.style.setProperty(
        "transform",
        `translateY(${differenceY}px)`
      );

      touchMove.differenceY = differenceY;
    };

    const open = () => {
      openMapStoreDetail(sheet, HEIGHT, undefined, location.pathname);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const move = touchStart.touchY - touchMove.moveTouchY;

      if (Math.abs(move) > 100 && touchMove.movingDirection === "up") {
        allOpenMapStoreDetail(sheet, HEIGHT);
      } else if (Math.abs(move) < 100 && touchMove.movingDirection === "up") {
        openMapStoreDetail(sheet, HEIGHT, true, location.pathname);
      } else if (
        Math.abs(move) > 100 &&
        touchMove.movingDirection === "down" &&
        location.pathname === "/map-store-detail"
      ) {
        openMapStoreDetail(sheet, HEIGHT, undefined, location.pathname);
      } else if (
        Math.abs(move) < 100 &&
        touchMove.movingDirection === "down" &&
        location.pathname === "/map-store-detail"
      ) {
        allOpenMapStoreDetail(sheet, HEIGHT);
      } else {
        openMapStoreDetail(sheet, HEIGHT, true, location.pathname);
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
      };
    };

    sheet?.current?.addEventListener("touchstart", handleTouchStart);
    sheet?.current?.addEventListener("touchmove", handleTouchMove);
    sheet?.current?.addEventListener("touchend", handleTouchEnd);
  }, []);

  return {
    sheet,

    allOpenMapStoreDetail,
    openMapStoreDetail,
    closeMapStoreDetail,
  };
}
