import { createSlice } from "@reduxjs/toolkit";

const initialState: number[] = [];

export const recommendReviewSlice = createSlice({
  name: "recommendReview",
  initialState,
  reducers: {
    initializeRecommendReview: () => initialState,
    changeRecommendReview: (
      state,
      {
        payload,
      }: {
        payload: {
          reviewId: number;
        };
      }
    ) => {
      const { reviewId } = payload;
      const existingIndex = state.findIndex((review) => review === reviewId);
      if (existingIndex !== -1) {
        state.splice(existingIndex, 1);
      } else {
        state.push(reviewId);
      }
    },
  },
});

export const { initializeRecommendReview, changeRecommendReview } =
  recommendReviewSlice.actions;

export default recommendReviewSlice.reducer;
