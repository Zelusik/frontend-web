import { createSlice } from "@reduxjs/toolkit";
import { ImageType } from "types/image";

// 이미지를 보여줄 path, 위도 경도 등을 저장할 slice
const initialState: ImageType[] = [];

export const reviewSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeImageInfo: (state, { payload }: { payload: ImageType }) => {
      state.push(payload);
    },
  },
});

export const { initializeDefaultInfo, changeImageInfo } = reviewSlice.actions;

export default reviewSlice.reducer;
