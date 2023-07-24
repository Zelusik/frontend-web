import { PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import authSlice from "./auth/authSlice";
import globalSlice from "./global/globalSlice";

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
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
