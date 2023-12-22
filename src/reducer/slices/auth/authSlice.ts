import { createSlice } from "@reduxjs/toolkit";
import { TermsType } from "@/types/auth";

interface AuthType {
  accessToken: string;
  refreshToken: string;
  terms: TermsType;
  favoriteFoodCategories: string[];
  [index: string]: string | string[] | TermsType;
}

const initialState: AuthType = {
  accessToken: "",
  refreshToken: "",
  terms: {
    isNotMinor: false,
    service: false,
    userInfo: false,
    locationInfo: false,
    marketingReception: false,
  },
  favoriteFoodCategories: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeDefaultInfo: () => initialState,
    changeAuthState: (
      state,
      { payload }: { payload: { type: string; value: string | string[] } }
    ) => {
      const { type, value } = payload;
      state[type] = value;
    },
    changeAuthTermsInfo: (
      state,
      { payload }: { payload: { type: string; value: boolean } }
    ) => {
      const { type, value } = payload;
      state.terms[type] = value;
    },
  },
});

export const { initializeDefaultInfo, changeAuthState, changeAuthTermsInfo } =
  authSlice.actions;

export default authSlice.reducer;
