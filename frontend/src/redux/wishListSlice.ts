import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const SESSION_KEY = "wishlist";

export interface WishlistState {
  items: string[];
  totalWishlistItems: number;
}

const emptyWishlistState: WishlistState = {
  items: [],
  totalWishlistItems: 0,
};

let sessionWishlist: WishlistState | undefined;

if (typeof window !== "undefined") {
  const storedWishlist = sessionStorage.getItem(SESSION_KEY);
  sessionWishlist = storedWishlist
    ? (JSON.parse(storedWishlist) as WishlistState)
    : emptyWishlistState;
}

const initialState: WishlistState = sessionWishlist
  ? sessionWishlist
  : emptyWishlistState;

const wishlistSlice = createSlice({
  name: SESSION_KEY,
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (typeof window !== "undefined") {
        if (!state.items.includes(action.payload)) {
          state.items.push(action.payload);
          state.totalWishlistItems = state.items.length;
          sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
        }
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
      state.totalWishlistItems = state.items.length;
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
      }
    },
    clearWishlist: () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(SESSION_KEY);
      }
      return emptyWishlistState;
    },
    setWishlistData: (state, action: PayloadAction<WishlistState>) => {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(action.payload));
      }
      return action.payload;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlistData,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
