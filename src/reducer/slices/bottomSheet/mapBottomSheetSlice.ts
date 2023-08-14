import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  ref: any;
  type: string;
  visible: number;
  actionDelay: boolean;
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  ref: null,
  type: "primary",
  visible: 0,
  actionDelay: false,
};

export const mapBottomSheetSlice = createSlice({
  name: "mapBottomSheet",
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
    changeType: (
      state,
      { payload }: { payload: { type: string; value: string } }
    ) => {
      const { value } = payload;
      state.type = value;
    },
    changeVisibleType: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      if (value[0]) state.actionDelay = value[0];
      state.visible = value[0];
      state.type = value[1];
      state.ref = value[2];
    },
  },
});

export const {
  initializeDefaultInfo,
  changeVisible,
  changeAction,
  changeVisibleType,
} = mapBottomSheetSlice.actions;

export default mapBottomSheetSlice.reducer;
