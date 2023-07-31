import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedImageState {
  currentIndex: number;
}

const initialState: SelectedImageState = {
  currentIndex: 0,
};

const currIdxSlice = createSlice({
  name: "currIdx",
  initialState,
  reducers: {
    setCurrentImageIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
  },
});

export const { setCurrentImageIndex } = currIdxSlice.actions;
export default currIdxSlice.reducer;
