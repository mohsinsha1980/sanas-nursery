import CryptoJS from "crypto-js";
import { USER_STORE_DATA_KEY } from "@/lib/constants";
import { encryptData } from "@/lib/helper";
import { UserInSessionTypes } from "@/lib/types/user-types";
import { createSlice } from "@reduxjs/toolkit";

export const decryptData = (encryptedData: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY as string
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (error) {
    console.log("decryptData error", error);
    sessionStorage.removeItem(USER_STORE_DATA_KEY);
    return null;
  }
};

let sessionUser: UserInSessionTypes | null = null;

if (typeof window !== "undefined") {
  const userData = sessionStorage.getItem(USER_STORE_DATA_KEY);
  sessionUser = userData ? decryptData(userData) : null;
}

export const emptyState: UserInSessionTypes = {
  _id: "",
  name: "",
  email: "",
  role: "",
  phone: "",
};

const initialState = sessionUser && sessionUser._id ? sessionUser : emptyState;

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      if (typeof window !== "undefined") {
        const updatedState: UserInSessionTypes = {
          ...state,
          ...action.payload,
        };
        sessionStorage.setItem(USER_STORE_DATA_KEY, encryptData(updatedState));
        return updatedState;
      }
      return state;
    },
    removeUser: () => {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem(USER_STORE_DATA_KEY);
        return emptyState;
      }
    },
  },
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
