import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import alertSlice from "./alert/alertSlice";
import authSlice from "./auth/authSlice";
import bottomSheetSlice from "./bottomSheet/bottomSheetSlice";
import mapBottomSheetSlice from "./bottomSheet/mapBottomSheetSlice";
import globalSlice from "./global/globalSlice";
import imageSlice from "./image/imageSlice";
import reviewSlice from "./review/reviewSlice";
import searchSlice from "./search/searchSlice";
import currIdxSlice from "./image/currIdxSlice";
import menuTagSlice from "./image/menuTagSlice";
import userSlice from "./user/userSlice";

const rootReducer = (state: any, action: PayloadAction<any>) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.global.init
        ? { ...state, ...action.payload }
        : { ...state };

    default: {
      const combineReducer = combineReducers({
        auth: authSlice,
        global: globalSlice,
        alert: alertSlice,
        bottomSheet: bottomSheetSlice,
        mapBottomSheet: mapBottomSheetSlice,
        search: searchSlice,
        image: imageSlice,
        menuTag: menuTagSlice,
        currIdx: currIdxSlice,
        review: reviewSlice,
        user: userSlice,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
