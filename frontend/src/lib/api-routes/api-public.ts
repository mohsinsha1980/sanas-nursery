// import { axiosInstance } from "../config/http";
// import { APP_PUBLIC_API_PATH } from "./api-routes/api-base-paths";
// import { buildQueryString } from "./helper";
// import { Controller, ProductFilterType } from "./types/common-types";
// import { ContactUsDataType } from "./types/public-types";
// import { SubscribeEmailApiType } from "./types/public-types";

import { axiosInstance } from "@/config/http";
import {
  BlogFilterType,
  ContactEnquiryFields,
  Controller,
  EmailType,
  OrderEnquiryType,
  PlantFilterType,
} from "../types/common-types";
import config from "@/config/env-config";
import { buildBlogQueryString, buildQueryString } from "../helper";

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

export const getPublicHomeData = (controller?: Controller) => {
  return fetch(`${config.API_PUBLIC_PATH}/home`, {
    signal: controller?.signal,
    cache: "no-store",
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
  data: OrderEnquiryType & { token: string },
  controller?: Controller
) => {
  return axiosInstance.post(`${config.API_PUBLIC_PATH}/order-enquiry`, data, {
    signal: controller?.signal,
  });
};

export const createContactEnquiry = (
  data: ContactEnquiryFields & {
    token: string;
  },
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

export const getPublishedBlogs = (searchParams?: BlogFilterType) => {
  const queryString = searchParams ? buildBlogQueryString(searchParams) : "";
  const url = queryString
    ? `${config.API_PUBLIC_PATH}/blogs${queryString}`
    : `${config.API_PUBLIC_PATH}/blogs`;

  return fetch(url, { cache: "no-store" });
};

export const getBlogBySlug = (slug: string, controller?: Controller) => {
  return fetch(`${config.API_PUBLIC_PATH}/blogs/${slug}`, {
    signal: controller?.signal,
    cache: "no-store",
  });
};

export const getRelatedBlogs = (blogId: string, controller?: Controller) => {
  return fetch(`${config.API_PUBLIC_PATH}/blogs/related/${blogId}`, {
    signal: controller?.signal,
    cache: "no-store",
  });
};

export const getGlobalSearchOpt = (controller: Controller) => {
  return axiosInstance.get(`${config.API_PUBLIC_PATH}/global-search-opt`, {
    signal: controller?.signal,
  });
};
