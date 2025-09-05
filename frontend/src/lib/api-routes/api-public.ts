// import { axiosInstance } from "../config/http";
// import { APP_PUBLIC_API_PATH } from "./api-routes/api-base-paths";
// import { buildQueryString } from "./helper";
// import { Controller, ProductFilterType } from "./types/common-types";
// import { ContactUsDataType } from "./types/public-types";
// import { SubscribeEmailApiType } from "./types/public-types";

import { axiosInstance } from "@/config/http";
import {
  Controller,
  EmailType,
  OrderEnquiryType,
  PlantFilterType,
} from "../types/common-types";
import config from "@/config/env-config";
import { ContactFormData } from "@/components/home/contact/schema";
import { buildQueryString } from "../helper";

export const refreshToken = (controller?: Controller) => {
  return axiosInstance.get(`${config.API_USER_PATH}/refreshToken`, {
    signal: controller?.signal,
  });
};

export const addContactUs = (
  data: ContactFormData,
  controller?: Controller
) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phonenumber", data.phonenumber);
  formData.append("message", data.message);

  return axiosInstance.post(`/contact-us`, formData, {
    signal: controller?.signal,
  });
};

export const getCategoryPlants = (
  category: string,
  searchParams: PlantFilterType | undefined
) => {
  const queryString = searchParams ? buildQueryString(searchParams) : "";
  const url = queryString
    ? `${config.API_PUBLIC_PATH}/plants/${category}${queryString}`
    : `${config.API_PUBLIC_PATH}/plants/${category}`;

  return fetch(url, { cache: "no-store" });
};

export const getMasterData = (controller?: Controller) => {
  return axiosInstance.get(`${config.API_PUBLIC_PATH}/master-data`, {
    signal: controller?.signal,
  });
};

export const getPlantDetailsBySlug = (
  plantSlug: string,
  controller?: Controller
) => {
  return fetch(`${config.API_PUBLIC_PATH}/plant-slug/${plantSlug}`, {
    signal: controller?.signal,
    cache: "no-store",
  });
};

export const getPlantDetailsByID = (
  plantID: string,
  controller?: Controller
) => {
  return fetch(`${config.API_PUBLIC_PATH}/plant-ID/${plantID}`, {
    signal: controller?.signal,
    cache: "no-store",
  });
};

export const createOrderEnquiry = (
  data: OrderEnquiryType,
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_PUBLIC_PATH}/order-enquiry`, data, {
    signal: controller?.signal,
  });
};

export const createContactEnquiry = (
  data: OrderEnquiryType, // TODO : change here
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_PUBLIC_PATH}/contact-us`, data, {
    signal: controller?.signal,
  });
};

export const subscribeEmail = (
  data: EmailType & { token: string },
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_PUBLIC_PATH}/subscriptions`, data, {
    signal: controller?.signal,
  });
};

// export const getUser = (controller: Controller) => {
//   return axiosInstance
//     .get(`${APP_PUBLIC_API_PATH}/getUser`, {
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

// export const getCategories = () => {
//   return fetch(`${APP_PUBLIC_API_PATH}/categories`);
// };

// export const getL2Categories = (slug: string) => {
//   return fetch(`${APP_PUBLIC_API_PATH}/l2Categories/${slug}`);
// };

// export const getL3Categories = (l2_category: string, l1_category: string) => {
//   return fetch(
//     `${APP_PUBLIC_API_PATH}/l3Categories/${l2_category}/${l1_category}`
//   );
// };

// export const getProductsInL3 = (
//   l3_category: string,
//   l2_category: string,
//   l1_category: string,
//   searchParams: ProductFilterType | undefined
// ) => {
//   const queryString = searchParams ? buildQueryString(searchParams) : "";
//   const url = queryString
//     ? `${APP_PUBLIC_API_PATH}/getProductsInL3/${l3_category}/${l2_category}/${l1_category}${queryString}`
//     : `${APP_PUBLIC_API_PATH}/getProductsInL3/${l3_category}/${l2_category}/${l1_category}`;

//   return fetch(url, { cache: "no-store" });
// };

// export const getProductDetails = (
//   product_id: string,
//   controller?: Controller
// ) => {
//   return fetch(`${APP_PUBLIC_API_PATH}/getProductById/${product_id}`, {
//     signal: controller?.signal,
//     cache: "no-store",
//   });
// };

// export const getProductsInL1 = (
//   l1_category: string,
//   searchParams: ProductFilterType | undefined
// ) => {
//   const queryString = searchParams ? buildQueryString(searchParams) : "";
//   const url = queryString
//     ? `${APP_PUBLIC_API_PATH}/getProductsInL1/${l1_category}${queryString}`
//     : `${APP_PUBLIC_API_PATH}/getProductsInL1/${l1_category}`;

//   return fetch(url, { cache: "no-store" });
// };

// export const getProductsInL2 = (
//   l2_category: string,
//   l1_category: string,
//   searchParams: ProductFilterType | undefined
// ) => {
//   const queryString = searchParams ? buildQueryString(searchParams) : "";
//   const url = queryString
//     ? `${APP_PUBLIC_API_PATH}/getProductsInL2/${l2_category}/${l1_category}${queryString}`
//     : `${APP_PUBLIC_API_PATH}/getProductsInL2/${l2_category}/${l1_category}`;

//   return fetch(url, { cache: "no-store" });
// };

// export const getPublicHomeData = (controller?: Controller) => {
//   return fetch(`${APP_PUBLIC_API_PATH}/home`, {
//     cache: "no-store",
//     signal: controller?.signal,
//   });
// };

// export const getGalleryImages = (controller: Controller) => {
//   return axiosInstance.get(`${APP_PUBLIC_API_PATH}/gallery`, {
//     signal: controller?.signal,
//   });
// };

// export const getTrendyProducts = () => {
//   return fetch(`${APP_PUBLIC_API_PATH}/getTrendyProducts`, {
//     cache: "no-store",
//   });
// };

// export const getAccessories = () => {
//   return fetch(`${APP_PUBLIC_API_PATH}/getAccessories`, {
//     cache: "no-store",
//   });
// };

// export const getNavbar = (controller: Controller) => {
//   return axiosInstance.get(`${APP_PUBLIC_API_PATH}/getNavbar`, {
//     signal: controller?.signal,
//   });
// };

// export const getGlobalSearchOpt = (controller: Controller) => {
//   return axiosInstance.get(`${APP_PUBLIC_API_PATH}/getGlobalSearchOpt`, {
//     signal: controller?.signal,
//   });
// };

// export const getReviewByProductId = (productId: string) => {
//   return axiosInstance.get(`${APP_PUBLIC_API_PATH}/reviews`, {
//     params: { productId },
//   });
// };

// export const getMasterData = (controller?: Controller) => {
//   return axiosInstance.get(`${APP_PUBLIC_API_PATH}/master-data`, {
//     signal: controller?.signal,
//   });
// };

// export const subscribeEmail = (
//   data: SubscribeEmailApiType,
//   controller?: Controller
// ) => {
//   return axiosInstance.post(`${APP_PUBLIC_API_PATH}/subscriptions`, data, {
//     signal: controller?.signal,
//   });
// };

// export const getHomeClientData = (controller?: Controller) => {
//   return axiosInstance.get(`${APP_PUBLIC_API_PATH}/client-home`, {
//     signal: controller?.signal,
//   });
// };
