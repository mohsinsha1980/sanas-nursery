import { refreshToken } from "@/lib/api-routes/api-auth";
import { removeUser } from "@/redux/userSlice";
import axios from "axios";
import store from "../redux/store";

export const axiosInstance = axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;
let refreshSubscribers: (() => void)[] = [];

const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },

  async (error) => {
    const prevRequest = error?.config;

    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message === "AccessTokenExpiredError" &&
      !prevRequest?.sent
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        await refreshToken();
        onRefreshed();
        isRefreshing = false;
        prevRequest.sent = true;
        return axiosInstance(prevRequest);
      } else {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            prevRequest.sent = true;
            resolve(axiosInstance(prevRequest));
          });
        });
      }
    }

    // for refresh token expired
    if (
      error?.response?.status === 403 &&
      error?.response?.data?.message === "RefreshTokenExpiredError"
    ) {
      store.dispatch(removeUser());
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        const isProtectedPage =
          currentPath.includes("/user") || currentPath.includes("/admin");

        if (isProtectedPage) {
          // showErrorToast("Session Expired!");
          window.location.href = "/auth/signin";
        }
      }
      error.response.data.message = "Session Expired!";
    }

    return Promise.reject(error);
  }
);
