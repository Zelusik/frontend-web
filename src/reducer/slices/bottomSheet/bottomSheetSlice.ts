import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  type: string;
  visible: number;
  actionDelay: boolean;
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  type: "primary",
  visible: 0,
  actionDelay: false,
};

export const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeVisible: (
      state,
      { payload }: { payload: { type: string; value: number } }
    ) => {
      const { value } = payload;
      state.visible = value;
    },
    changeAction: (
      state,
      { payload }: { payload: { type: string; value: boolean } }
    ) => {
      const { value } = payload;
      state.actionDelay = value;
    },
    changeVisibleType: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      if (value[0]) state.actionDelay = value[0];
      state.visible = value[0];
      state.type = value[1];
    },
  },
});

export const {
  initializeDefaultInfo,
  changeVisible,
  changeAction,
  changeVisibleType,
} = bottomSheetSlice.actions;

export default bottomSheetSlice.reducer;
