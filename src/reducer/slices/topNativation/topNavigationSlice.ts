import { createSlice } from "@reduxjs/toolkit";

interface TopNavigationProps {
  scrollRef: any;
}

const initialState: TopNavigationProps = {
  scrollRef: null,
};

export const topNativationSlice = createSlice({
  name: "topNavigation",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    initialScrollRef: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.scrollRef = value;
    },
  },
});

export const { initializeDefaultInfo, initialScrollRef } =
  topNativationSlice.actions;

export default topNativationSlice.reducer;
