import { createSlice } from "@reduxjs/toolkit";
import { MenuTagType } from "@/types/image";

const initialState: MenuTagType = {
  x: 0,
  y: 0,
  menu: "",
};

const menuTagSlice = createSlice({
  name: "menuTag",
  initialState,
  reducers: {
    initializeMenuTag: () => initialState,
    changeMenuTag: (
      state,
      { payload }: { payload: { type: string; value: number | string } }
    ) => {
      const { type, value } = payload;
      state[type] = value;
    },
  },
});

export const { initializeMenuTag, changeMenuTag } = menuTagSlice.actions;
export default menuTagSlice.reducer;
