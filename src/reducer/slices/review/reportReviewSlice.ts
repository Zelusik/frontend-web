import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  reviewId: 0,
};

export const reportSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    initializeReviewId: () => initialState,
    setReviewId: (state, action: PayloadAction<number>) => {
      state.reviewId = action.payload;
    },
  },
});

export const { initializeReviewId, setReviewId } = reportSlice.actions;

export default reportSlice.reducer;
