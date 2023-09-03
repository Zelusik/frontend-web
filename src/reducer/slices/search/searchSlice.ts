import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  type: "location" | "store" | "default";
  filterAction: boolean;
  actionDelay: boolean;

  foodType: any;
  newFoodType: any;
  dayOfWeek: any[];
  newDayOfWeek: any[];
  mood: any;
  newMood: any;

  location: any;

  placeInfo: any;
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  type: "default",
  filterAction: false,
  actionDelay: false,

  value: "",
  foodType: "",
  newFoodType: "",
  dayOfWeek: [],
  newDayOfWeek: [],
  mood: "",
  newMood: "",

  location: { lat: 0, lng: 0 },

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
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeValue: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.value = value;
    },
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

    changeFoodType: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.foodType = value;
    },
    changeNewFoodType: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.newFoodType = value;
    },

    changeDayOfWeek: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.dayOfWeek = value;
    },
    changeNewDayOfWeek: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.newDayOfWeek = value;
    },

    changeMood: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.mood = value;
    },
    changeNewMood: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.newMood = value;
    },

    changePlaceInfo: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.placeInfo = value;
    },
  },
});

export const {
  initializeDefaultInfo,
  changeValue,

  changeType,
  changeLocation,
  changeFilterAction,

  changeFoodType,
  changeNewFoodType,

  changeDayOfWeek,
  changeNewDayOfWeek,

  changeMood,
  changeNewMood,

  changePlaceInfo,
} = searchSlice.actions;

export default searchSlice.reducer;
