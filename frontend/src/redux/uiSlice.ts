import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  loader: boolean;
}

const initialState: UIState = {
  loader: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: initialState,
  reducers: {
    showLoader: (state) => {
      return {
        ...state,
        loader: true,
      };
    },
    hideLoader: (state) => {
      return {
        ...state,
        loader: false,
      };
    },
  },
});

export const { showLoader, hideLoader } = uiSlice.actions;
export default uiSlice.reducer;
