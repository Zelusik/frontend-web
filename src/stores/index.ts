import rootReducer from "@/reducer/slices";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });

const store = makeStore();

export const wrapper = createWrapper<AppStore>(makeStore, {
  // debug: process.env.NODE_ENV === 'development',
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default wrapper;
