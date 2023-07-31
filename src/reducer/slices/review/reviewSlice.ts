import { createSlice } from "@reduxjs/toolkit";
import { PlaceType, ReviewType } from "types/review";

const initialState: ReviewType = {
  placeId: 0,
  placeInfo: {
    kakaoPid: "",
    name: "",
    pageUrl: "",
    categoryName: "",
    categoryGroupCode: "",
    phone: "",
    lotNumberAddress: "",
    roadAddress: "",
    lat: "",
    lng: "",
  },
  foodInfo: [],
  keywords: [],
  autoCreatedContent: "",
  content: "",
  images: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    initializeReviewInfo: () => initialState,
    changeReviewInfo: (
      state,
      {
        payload,
      }: { payload: { type: string; value: string | string[] | PlaceType } }
    ) => {
      const { type, value } = payload;
      state[type] = value;
    },
  },
});

export const { initializeReviewInfo, changeReviewInfo } = reviewSlice.actions;

export default reviewSlice.reducer;
