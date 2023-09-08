import { useEffect, useState } from "react";

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

export default function useDisplaySize() {
  const initialWidth =
    typeof window !== "undefined"
      ? window.innerWidth > 820
        ? 820
        : window.innerWidth
      : 0;
  const initialHeight = typeof window !== "undefined" ? window.innerHeight : 0;

  const [width, setWidth] = useState<number>(initialWidth);
  const [height, setHeight] = useState<number>(initialHeight);

  const handleResize = () => {
    setWidth(window.innerWidth > 820 ? 820 : window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, height };
}
