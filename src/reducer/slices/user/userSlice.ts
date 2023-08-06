import { createSlice } from "@reduxjs/toolkit";
import { UserInfoType } from "types/user";

const initialState: UserInfoType = {
  birthDay: "",
  email: "",
  favoriteFoodCategories: [],
  gender: "",
  id: 0,
  image: { url: "", thumbnailUrl: "" },
  nickname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUserInfo: () => initialState,
    changeUserInfo: (
      state,
      {
        payload,
      }: {
        payload: {
          type: string;
          value: number | string | string[] | { url: string; thumbnailUrl: string };
        };
      }
    ) => {
      const { type, value } = payload;
      state[type] = value;
    },
  },
});

export const { initializeUserInfo, changeUserInfo } = userSlice.actions;

export default userSlice.reducer;
