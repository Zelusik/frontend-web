import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  type: string;
  visible: boolean;
  sortId: number;
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  type: "sort",
  visible: false,
  sortId: 1,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeAlertVisible: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.visible = value[0];
      state.type = value[1];
    },
    changeSort: (
      state,
      { payload }: { payload: { type: string; value: number } }
    ) => {
      const { value } = payload;
      state.sortId = value;
    },
  },
});

export const { initializeDefaultInfo, changeAlertVisible, changeSort } =
  alertSlice.actions;

export default alertSlice.reducer;
