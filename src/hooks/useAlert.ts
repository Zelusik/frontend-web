import { useState, useCallback } from "react";
import {
  changeAlertVisible,
  changeSort,
} from "reducer/slices/alert/alertSlice";
import { useAppDispatch } from "./useReduxHooks";

const useAlert = () => {
  const dispatch = useAppDispatch();

  const openAlert = useCallback((type: string) => {
    dispatch(
      changeAlertVisible({
        type: "alert",
        value: [true, type],
      })
    );
  }, []);

  const closeAlert = useCallback(() => {
    dispatch(
      changeAlertVisible({
        type: "alert",
        value: [false, "sort"],
      })
    );
  }, []);

  const sortIdChange = useCallback((idx: number) => {
    dispatch(
      changeSort({
        type: "alert",
        value: idx + 1,
      })
    );
  }, []);

  return { openAlert, closeAlert, sortIdChange };
};

export default useAlert;
