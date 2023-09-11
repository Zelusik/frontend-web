import { globalValue } from "constants/globalValue";
import { useRef, useEffect, useCallback } from "react";
import { useAppDispatch } from "./useReduxHooks";

interface BottomSheetMetrics {
  pathname: any;
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

  const allOpenMapStoreDetail = useCallback((sheetInner: any, height: any) => {
    console.log("allOpenMapStoreDetail");
    history.pushState({ page: "modal" }, document.title, "map-store-detail");
    sheetInner.current!.style.setProperty(
      "transform",
      `translateY(-${height}px)`
    );
  }, []);

  const openMapStoreDetail = useCallback(
    (sheetInner: any, height: any, pathname: any, popstate?: any) => {
      console.log("openMapStoreDetail " + pathname);
      if (pathname === "/map-store-detail") {
        history.back();
      } else if (popstate) {
      } else {
        console.log("add");
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
    console.log("closeMapStoreDetail");
    history.back();
    sheetInner.current!.style.setProperty("transform", `translateY(0)`);
  }, []);

  const metrics = useRef<BottomSheetMetrics>({
    pathname: "",
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
        metrics.current.pathname === "/map-store-detail"
          ? HEIGHT - globalValue.BOTTOM_NAVIGATION_HEIGHT
          : HEIGHT * 0.3;

      let differenceY = touchMove.moveTouchY - touchStart.touchY - TOP;
      if (
        (metrics.current.pathname === "/map-store-detail" &&
          differenceY < -TOP) ||
        (metrics.current.pathname === "/map-store-detail-modal" &&
          differenceY > -TOP)
      ) {
        return;
      }

      sheet.current!.style.setProperty(
        "transform",
        `translateY(${differenceY}px)`
      );

      touchMove.differenceY = differenceY;
    };

    const allOpen = () => {
      allOpenMapStoreDetail(sheet, HEIGHT);
      metrics.current.pathname = "/map-store-detail";
    };
    const open = () => {
      openMapStoreDetail(sheet, HEIGHT, metrics.current.pathname);
      metrics.current.pathname = "/map-store-detail-modal";
    };
    const onlyOpen = () => {
      openMapStoreDetail(sheet, HEIGHT, metrics.current.pathname, true);
      metrics.current.pathname = "/map-store-detail-modal";
    };
    const close = () => {
      //   closeMapBottomSheet(sheet);
      closeMapStoreDetail(sheet, false);
      sheet.current!.style.setProperty("transform", `translateY(0)`);
      metrics.current.pathname = "/map";
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const move = touchStart.touchY - touchMove.moveTouchY;

      if (Math.abs(move) > 100 && touchMove.movingDirection === "up") {
        // console.log("UP AllOpen");
        allOpen();
      } else if (Math.abs(move) < 100 && touchMove.movingDirection === "up") {
        // console.log("UP Open");
        onlyOpen();
      } else if (
        Math.abs(move) > 100 &&
        touchMove.movingDirection === "down" &&
        metrics.current.pathname === "/map-store-detail"
      ) {
        // console.log("DOWN Open");
        open();
      } else if (
        Math.abs(move) < 100 &&
        touchMove.movingDirection === "down" &&
        metrics.current.pathname === "/map-store-detail"
      ) {
        // console.log("DOWN AllOpen");
        allOpen();
      } else {
        // console.log("DOWN OPEN");
        onlyOpen();
      }

      //   console.log(touchMove.movingDirection);
      //   console.log(touchMove.movingDirection);
      //   console.log(metrics.current.pathname);

      // metrics 초기화.
      metrics.current = {
        pathname: "",
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
