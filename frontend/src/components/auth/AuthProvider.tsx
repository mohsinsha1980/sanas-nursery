"use client";
import { getLogedInUser } from "@/lib/api-routes/api-auth";
import { decryptData } from "@/lib/helper";
import { RootState } from "@/redux/store";
import { hideLoader, showLoader } from "@/redux/uiSlice";
import { updateUser } from "@/redux/userSlice";
import { mergeWishlistFromDB } from "@/redux/wishListSlice";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const controller = new AbortController();
    const getUserDetails = async () => {
      try {
        dispatch(showLoader());
        const response = await getLogedInUser(controller);
        const encryptedUserData = response.data.data?.user;
        const userData = decryptData(encryptedUserData);
        dispatch(updateUser(userData));
        if (response.data.data?.wishlist?.length) {
          dispatch(mergeWishlistFromDB(response.data.data?.wishlist));
        }
      } finally {
        dispatch(hideLoader());
      }
    };

    if (!user || !user._id) {
      getUserDetails();
    }

    return () => {
      controller.abort();
      dispatch(hideLoader());
    };
  }, [dispatch, user]);

  return <>{children}</>;
};

export default AuthProvider;
