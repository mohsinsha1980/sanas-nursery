// import { axiosInstance } from "@/config/http";
// import {
//   APP_USER_PATH,
//   COUNTRY_STATE_CITY_PATH,
// } from "./api-routes/api-base-paths";
// import {
//   Controller,
//   PaginationDataType,
//   ReviewFormDataType,
// } from "./types/common-types";
// import {
//   Address,
//   AddToCartTypes,
//   CartState,
//   DeleteAddressType,
//   EditProfileFields,
//   EditProfilePassword,
//   EmailValidationData,
//   EmailVerificationData,
//   GetTopCourierPayload,
//   SupportType,
//   UpdateProfilePassword,
// } from "./types/user-types";

// export const addReview = (data: ReviewFormDataType, controller: Controller) => {
//   return axiosInstance.post(`${APP_USER_PATH}/reviews`, data, {
//     signal: controller?.signal,
//   });
// };

// export const removeProductFromWishList = (
//   productId: string,
//   controller?: Controller
// ) => {
//   return axiosInstance.delete(`${APP_USER_PATH}/wishlist/${productId}`, {
//     signal: controller?.signal,
//   });
// };

// export const addProductToWishList = (
//   productId: string,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(
//     `${APP_USER_PATH}/wishlist/`,
//     { productId },
//     {
//       signal: controller?.signal,
//     }
//   );
// };

// export const updateUserProfile = (
//   data: EditProfileFields | EditProfilePassword,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_USER_PATH}/updateUserProfile`, data, {
//     signal: controller?.signal,
//   });
// };

// export const deleteAddress = (
//   data: DeleteAddressType,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_USER_PATH}/deleteAddress`, data, {
//     signal: controller?.signal,
//   });
// };

// export const addAddress = (data: Address, controller?: Controller) => {
//   return axiosInstance.post(`${APP_USER_PATH}/addAddress`, data, {
//     signal: controller?.signal,
//   });
// };

// export const getStates = async (countryCode: string) => {
//   const response = await axiosInstance.get(
//     `${COUNTRY_STATE_CITY_PATH}/countries/${countryCode}/states`,
//     {
//       headers: {
//         "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_X_CSCAPI_KEY,
//       },
//       withCredentials: false,
//     }
//   );
//   return response.data;
// };

// export const getCities = async (countryCode: string, stateCode: string) => {
//   const response = await axiosInstance.get(
//     `${COUNTRY_STATE_CITY_PATH}/countries/${countryCode}/states/${stateCode}/cities`,
//     {
//       headers: {
//         "X-CSCAPI-KEY": process.env.NEXT_PUBLIC_X_CSCAPI_KEY,
//       },
//       withCredentials: false,
//     }
//   );
//   return response.data;
// };

// export const getWishlistProducts = (userId: string) => {
//   return axiosInstance.get(`${APP_USER_PATH}/wishlist`, {
//     params: { userId },
//   });
// };

// export const addProductToCart = (
//   data: AddToCartTypes,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_USER_PATH}/carts`, data, {
//     signal: controller?.signal,
//   });
// };

// export const getCartOrders = (
//   data: CartState | undefined,
//   controller?: Controller,
//   query?: URLSearchParams
// ) => {
//   const url = query
//     ? `${APP_USER_PATH}/checkout/getCartOrders?${query}`
//     : `${APP_USER_PATH}/checkout/getCartOrders`;
//   return axiosInstance.put(url, data, {
//     signal: controller?.signal,
//   });
// };

// export const getCartProducts = (userId: string) => {
//   return axiosInstance.get(`${APP_USER_PATH}/carts`, {
//     params: { userId },
//   });
// };

// export const removeFromCart = (itemId: string, controller?: Controller) => {
//   return axiosInstance.delete(`${APP_USER_PATH}/carts/${itemId}`, {
//     signal: controller?.signal,
//   });
// };

// export const downloadBill = (orderId: string, controller?: Controller) => {
//   return axiosInstance.get(
//     `${APP_USER_PATH}/orders/download?order_id=${orderId}`,
//     {
//       signal: controller?.signal,
//       responseType: "blob",
//     }
//   );
// };

// export const getEmailOtp = (
//   data: EmailVerificationData,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_USER_PATH}/getEmailOtp`, data, {
//     signal: controller?.signal,
//   });
// };

// export const validateEmailOtp = (
//   data: EmailValidationData,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_USER_PATH}/validateEmailOtp`, data, {
//     signal: controller?.signal,
//   });
// };

// export const updateUserPassword = (
//   data: UpdateProfilePassword,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_USER_PATH}/updateUserPassword`, data, {
//     signal: controller?.signal,
//   });
// };

// export const getUserOrders = (
//   paginationData: PaginationDataType,
//   controller?: Controller
// ) => {
//   const { page, perPage } = paginationData;
//   return axiosInstance.get(
//     `${APP_USER_PATH}/orders?page=${page}&per_page=${perPage}`,
//     {
//       signal: controller?.signal,
//     }
//   );
// };

// export const addSupport = (data: SupportType, controller?: Controller) => {
//   return axiosInstance.post(`${APP_USER_PATH}/support`, data, {
//     signal: controller?.signal,
//   });
// };

// export const getTopCouriers = (
//   data: GetTopCourierPayload,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_USER_PATH}/delivery/getTopCouriers`, data, {
//     signal: controller?.signal,
//   });
// };

// export const checkIsDeliverable = (
//   data: { pincode: string },
//   controller?: Controller
// ) => {
//   return axiosInstance.post(
//     `${APP_USER_PATH}/delivery/checkIsDeliverable`,
//     data,
//     {
//       signal: controller?.signal,
//     }
//   );
// };

// export const getOrderById = (orderId: string, controller?: Controller) => {
//   return axiosInstance.get(`${APP_USER_PATH}/orders/${orderId}`, {
//     signal: controller?.signal,
//   });
// };
