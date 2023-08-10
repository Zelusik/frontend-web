import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  type: any;
  filterAction: boolean;
  foodType: any[];
  dayOfWeek: any[];
  mood: any[];
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  type: "default",
  filterAction: false,
  foodType: [],
  dayOfWeek: [],
  mood: [],
  actionDelay: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeType: (
      state,
      { payload }: { payload: { type: string; value: string } }
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
  },
});

export const { initializeDefaultInfo, changeType, changeFilterAction } =
  searchSlice.actions;

export default searchSlice.reducer;
