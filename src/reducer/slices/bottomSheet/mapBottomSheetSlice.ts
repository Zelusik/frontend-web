import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  type: string;
  visible: number;
  actionDelay: boolean;
  [index: string]: string | string[] | any;
  auto: "up" | "down" | "none";
}

const initialState: GlobalType = {
  type: "primary",
  visible: 0,
  actionDelay: false,
  auto: "none",
};

export const mapBottomSheetSlice = createSlice({
  name: "mapBottomSheet",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeMapVisible: (
      state,
      { payload }: { payload: { type: string; value: number } }
    ) => {
      const { value } = payload;
      state.visible = value;
    },
    changeMapAction: (
      state,
      { payload }: { payload: { type: string; value: boolean } }
    ) => {
      const { value } = payload;
      state.actionDelay = value;
    },
    changeMapVisibleType: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      if (value[0]) state.actionDelay = value[0];
      state.visible = value[0];
      state.type = value[1];
    },
    changeAuto: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.auto = value;
    },
  },
});

export const {
  initializeDefaultInfo,
  changeMapVisible,
  changeMapAction,
  changeMapVisibleType,
  changeAuto,
} = mapBottomSheetSlice.actions;

export default mapBottomSheetSlice.reducer;
