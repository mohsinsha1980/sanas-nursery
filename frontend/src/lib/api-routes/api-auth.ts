// import { axiosInstance } from "@/config/http";
// import {
//   ForgetPassApiType,
//   GetAuthOtpApiType,
//   SignInUserApiType,
//   ValidateOtpApiType,
// } from "../types/auth-types";
// import { Controller } from "../types/common-types";
// import config from "@/config/env-config";

// export const getAuthOtp = (
//   data: GetAuthOtpApiType,
//   controller?: Controller
// ) => {
//   return axiosInstance
//     .post(`${config.API_AUTH_PATH}/getAuthOtp`, data, {
//       signal: controller?.signal,
//     })
//     .then((res) => res.data)
//     .catch((e) => {
//       return (
//         e?.response?.data || {
//           error: true,
//           message: "Something went wrong!",
//         }
//       );
//     });
// };

// export const validateOtp = (data: ValidateOtpApiType) => {
//   return axiosInstance
//     .post(`${config.API_AUTH_PATH}/validateOtp`, data)
//     .then((res) => res.data)
//     .catch((e) => {
//       return (
//         e?.response?.data || {
//           error: true,
//           message: "Something went wrong!",
//         }
//       );
//     });
// };

// export const signin = (
//   userData: SignInUserApiType,
//   controller?: Controller
// ) => {
//   return axiosInstance
//     .post(`${config.API_AUTH_PATH}/signin`, userData, {
//       signal: controller?.signal,
//     })
//     .then((res) => res.data)
//     .catch((e) => {
//       return (
//         e?.response?.data || {
//           error: true,
//           message: "Something went wrong!",
//         }
//       );
//     });
// };

// export const forgotPassword = (
//   data: ForgetPassApiType,
//   controller?: Controller
// ) => {
//   return axiosInstance
//     .post(`${config.API_AUTH_PATH}/forgotPassword`, data, {
//       signal: controller?.signal,
//     })
//     .then((res) => {
//       return res.data;
//     })
//     .catch((e) => {
//       return (
//         e?.response?.data || {
//           error: true,
//           message: "Something went wrong!",
//         }
//       );
//     });
// };

// export const resetPassword = (
//   data: ResetPasswordApiType,
//   controller?: Controller
// ) => {
//   return axiosInstance
//     .post(`${config.API_AUTH_PATH}/resetPassword`, data, {
//       signal: controller?.signal,
//     })
//     .then((res) => res.data)
//     .catch((e) => {
//       return (
//         e?.response?.data || {
//           error: true,
//           message: "Something went wrong!",
//         }
//       );
//     });
// };

// export const logout = async (
//   userData: UserInSessionTypes,
//   controller?: Controller
// ) => {
//   try {
//     const response = await axiosInstance.post(
//       `${config.API_AUTH_PATH}/logout`,
//       userData,
//       {
//         signal: controller?.signal,
//       }
//     );

//     window.location.href = "/";
//     return response.data;
//   } catch (error) {
//     return (error as AxiosError).response?.data || { message: "Logout failed" };
//   }
// };
