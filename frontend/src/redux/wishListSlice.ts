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
  const storedWishlist = localStorage.getItem(SESSION_KEY);
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
          localStorage.setItem(SESSION_KEY, JSON.stringify(state));
        }
      }
    },
    removeFromWishlistStore: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
      state.totalWishlistItems = state.items.length;
      if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(state));
      }
    },
    clearWishlist: () => {
      if (typeof window !== "undefined") {
        localStorage.removeItem(SESSION_KEY);
      }
      return emptyWishlistState;
    },
    setWishlistData: (state, action: PayloadAction<WishlistState>) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(SESSION_KEY, JSON.stringify(action.payload));
      }
      return action.payload;
    },
    mergeWishlistFromDB: (state, action: PayloadAction<string[]>) => {
      const newItems = action.payload.filter((id) => !state.items.includes(id));
      if (newItems.length > 0) {
        state.items.push(...newItems);
        state.totalWishlistItems = state.items.length;
        if (typeof window !== "undefined") {
          localStorage.setItem(SESSION_KEY, JSON.stringify(state));
        }
      }
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlistStore,
  clearWishlist,
  setWishlistData,
  mergeWishlistFromDB,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
