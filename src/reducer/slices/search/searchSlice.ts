import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  type: "location" | "store" | "default";
  filterAction: boolean;
  actionDelay: boolean;
  foodType: any;
  dayOfWeek: any[];
  mood: any;
  location: any;
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  type: "default",
  filterAction: false,
  actionDelay: false,
  foodType: null,
  dayOfWeek: [],
  mood: null,
  location: { lat: 0, lng: 0 },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeType: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.type = value;
    },
    changeFilterAction: (
      state,
      { payload }: { payload: { type: string; value: boolean } }
    ) => {
      const { value } = payload;
      state.filterAction = value;
    },
    changeLocation: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.location = value;
    },
  },
});

export const {
  initializeDefaultInfo,
  changeType,
  changeLocation,
  changeFilterAction,
} = searchSlice.actions;

export default searchSlice.reducer;
