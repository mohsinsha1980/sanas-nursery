import config from "@/config/env-config";
import { axiosInstance } from "@/config/http";
import { Controller, PasswordChangeFormData } from "../types/common-types";
import { ProfileEditFormData } from "../types/user-types";

export const updateUserProfile = (
  data: ProfileEditFormData,
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_USER_PATH}/profile`, data, {
    signal: controller?.signal,
  });
};

export const updateUserPassword = (
  data: PasswordChangeFormData,
  controller?: Controller
) => {
  return axiosInstance.put(`${config.API_USER_PATH}/update-password`, data, {
    signal: controller?.signal,
  });
};

export const getUserEnquiries = (controller?: Controller) => {
  return axiosInstance.get(`${config.API_USER_PATH}/enquiries`, {
    signal: controller?.signal,
  });
};

export const getUserWishlist = (controller?: Controller) => {
  return axiosInstance.get(`${config.API_USER_PATH}/wishlist`, {
    signal: controller?.signal,
  });
};

export const removeFromWishlist = (_id: string, controller?: Controller) => {
  return axiosInstance.delete(`${config.API_USER_PATH}/wishlist/${_id}`, {
    signal: controller?.signal,
  });
};
