import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  placeId: 0,
};

export const reportPlaceSlice = createSlice({
  name: 'reportPlace',
  initialState,
  reducers: {
    initializePlaceId: () => initialState,
    setPlaceId: (state, action: PayloadAction<number>) => {
      state.placeId = action.payload;
    },
  },
});

export const { initializePlaceId, setPlaceId } = reportPlaceSlice.actions;

export default reportPlaceSlice.reducer;
