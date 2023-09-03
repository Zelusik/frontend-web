import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  language: string;
  display: any;
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  language: "kor",
  display: {
    width: 0,
    height: 0,
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeDisplayState: (
      state,
      { payload }: { payload: { type: string; value: number[] } }
    ) => {
      const { type, value } = payload;
      state[type].width = value[0];
      state[type].height = value[1];
    },
  },
});

export const { initializeDefaultInfo, changeDisplayState } =
  globalSlice.actions;

export default globalSlice.reducer;
