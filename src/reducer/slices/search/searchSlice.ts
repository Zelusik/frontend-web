import { createSlice } from "@reduxjs/toolkit";

interface GlobalType {
  type: "location" | "store" | "default";
  visible: boolean;
  actionDelay: boolean;
  filterVisible: boolean;

  foodType: any;
  newFoodType: any;
  dayOfWeek: any[];
  newDayOfWeek: any[];
  mood: any;
  newMood: any;

  location: any;
  store: any;

  placeInfo: any;
  [index: string]: string | string[] | any;
}

const initialState: GlobalType = {
  type: "default",
  visible: false,
  actionDelay: false,
  filterVisible: false,
  value: "",
  searchValue: "",

  foodType: "",
  newFoodType: "",
  dayOfWeek: [],
  newDayOfWeek: [],
  mood: "",
  newMood: "",

  location: { lat: 0, lng: 0 },
  store: {
    id: -1,
    name: "",
    category: "",
    images: [],
    top3Keywords: [],

    isMarked: false,
    address: {
      lotNumberAddress: "",
      roadAddress: "",
      sgg: "",
      sido: "",
    },
    point: { lat: 0, lng: 0 },
  },

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
    changeType: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.type = value;
    },
    changeVisible: (
      state,
      { payload }: { payload: { type: string; value: boolean } }
    ) => {
      const { value } = payload;
      state.visible = value;
    },
    changeActionDelay: (
      state,
      { payload }: { payload: { type: string; value: boolean } }
    ) => {
      const { value } = payload;
      state.actionDelay = value;
    },
    changeFilterVisible: (
      state,
      { payload }: { payload: { type: string; value: boolean } }
    ) => {
      const { value } = payload;
      state.filterVisible = value;
    },
    changeValue: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      // const { value } = payload;
      // state.value = value;
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

    changeStore: (
      state,
      { payload }: { payload: { type: string; value: any } }
    ) => {
      const { value } = payload;
      state.store = value;
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
  changeType,
  changeVisible,
  changeActionDelay,
  changeFilterVisible,
  changeValue,
  changeLocation,

  changeFoodType,
  changeNewFoodType,

  changeDayOfWeek,
  changeNewDayOfWeek,

  changeMood,
  changeNewMood,

  changeStore,
  changePlaceInfo,
} = searchSlice.actions;

export default searchSlice.reducer;
