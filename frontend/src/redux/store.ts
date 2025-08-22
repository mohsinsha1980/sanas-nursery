import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishListSlice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    cart: wishlistReducer,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
