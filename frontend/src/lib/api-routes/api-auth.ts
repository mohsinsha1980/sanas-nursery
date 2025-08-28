import config from "@/config/env-config";
import { axiosInstance } from "@/config/http";
import {
  ForgetPassField,
  ResetPassType,
  SignInType,
  SignUpType,
} from "../types/auth-types";
import { Controller } from "../types/common-types";

export const signup = (
  data: SignUpType & { token: string },
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_AUTH_PATH}/signup`, data, {
    signal: controller?.signal,
  });
};

export const signin = (
  data: SignInType & { token: string },
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_AUTH_PATH}/signin`, data, {
    signal: controller?.signal,
  });
};

export const forgotPassword = (
  data: ForgetPassField & { token: string },
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_AUTH_PATH}/forgot-password`, data, {
    signal: controller?.signal,
  });
};

export const resetPassword = (
  data: ResetPassType & { token: string },
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_AUTH_PATH}/reset-password`, data, {
    signal: controller?.signal,
  });
};

export const logout = (controller?: Controller) => {
  return axiosInstance.post(`${config.API_AUTH_PATH}/logout`, {
    signal: controller?.signal,
  });
};

export const getLogedInUser = (controller: Controller) => {
  return axiosInstance.get(`${config.API_AUTH_PATH}/login-user`, {
    signal: controller?.signal,
  });
};
