import { globalValue } from "constants/globalValue";
import { useAppSelector } from "hooks/useReduxHooks";
import { useEffect, useState } from "react";

export const MIN_Y = globalValue.BOTTOM_NAVIGATION_HEIGHT + 844 * 0.24 + 82; //132
export const MAX_Y = 844 - 0;
export const BOTTOM_SHEET_HEIGHT =
  844 - (globalValue.BOTTOM_NAVIGATION_HEIGHT + 82);

const BottomSheetOption = () => {
  const { display } = useAppSelector((state) => state.global);

  const [MIN_Y, setMIN] = useState<number>(
    globalValue.BOTTOM_NAVIGATION_HEIGHT + 844 * 0.24 + 82
  );
  const [MAX_Y, setMAX] = useState<number>(844);
  const [BOTTOM_SHEET_HEIGHT, setBottomSheetHeight] = useState<number>(
    844 - (globalValue.BOTTOM_NAVIGATION_HEIGHT + 82)
  );

  useEffect(() => {
    setMIN(
      globalValue.BOTTOM_NAVIGATION_HEIGHT + window.innerHeight * 0.24 + 82
    ); // 132
    setMAX(window.innerHeight);
    setBottomSheetHeight(
      window.innerHeight - (globalValue.BOTTOM_NAVIGATION_HEIGHT + 82)
    );
  }, []);

  return { MIN_Y, MAX_Y, BOTTOM_SHEET_HEIGHT };
};

export default BottomSheetOption;
