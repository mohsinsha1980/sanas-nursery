import config from "@/config/env-config";
import { axiosInstance } from "@/config/http";
import { AxiosResponse } from "axios";
import { Controller, PaginationDataType } from "../types/common-types";
import { PasswordData } from "../types/admin-types";

export const getUsers = (
  pagination: PaginationDataType,
  controller: Controller
): Promise<AxiosResponse> => {
  return axiosInstance.get(
    `${config.API_ADMIN_PATH}/users?page=${pagination.page}&per_page=${pagination.perPage}`,
    {
      signal: controller?.signal,
    }
  );
};

export const updatePassword = (data: PasswordData, controller: Controller) => {
  return axiosInstance.post(`${config.API_ADMIN_PATH}/updatePassword`, data, {
    signal: controller?.signal,
  });
};

// export const createProduct = (
//   data: AddProductFields,
//   controller?: Controller
// ) => {
//   const form = new FormData();
//   form.append("title", data.title);
//   form.append("slug", data.slug);
//   form.append("l1_category", data.l1_category);
//   form.append("l2_category", data.l2_category);
//   form.append("l3_category", data.l3_category || "");
//   form.append("taxRate", data.taxRate.toString());
//   form.append("weight", data.weight.toString());
//   form.append("length", data.length.toString());
//   form.append("width", data.width.toString());
//   form.append("height", data.height.toString());
//   form.append("details", data.details || "");
//   form.append("status", data.status ? STATUS.ACTIVE : STATUS.INACTIVE);
//   form.append("variants", JSON.stringify(data.variants) || "");
//   form.append("description", data.description);
//   form.append("summary", data.summary);
//   form.append("metaDescription", data.metaDescription);
//   form.append("sizeChart", JSON.stringify(data.sizeChart));
//   form.append("hsnNumber", data.hsnNumber || "");

//   for (let i = 0; i < data.pictures?.length; i++) {
//     form.append("pictures", data.pictures[i]);
//   }

//   return axiosInstance.post(`${config.API_ADMIN_PATH}/products`, form, {
//     signal: controller?.signal,
//   });
// };

// export const updateProduct = (
//   data: EditProductFields,
//   controller?: Controller
// ) => {
//   const form = new FormData();
//   form.append("title", data.title);
//   form.append("slug", data.slug);
//   form.append("l1_category", data.l1_category);
//   form.append("l2_category", data.l2_category);
//   form.append("l3_category", data.l3_category || "");
//   form.append("taxRate", data.taxRate.toString());
//   form.append("weight", data.weight.toString());
//   form.append("length", data.length.toString());
//   form.append("width", data.width.toString());
//   form.append("height", data.height.toString());
//   form.append("details", data.details || "");
//   form.append("status", data.status ? STATUS.ACTIVE : STATUS.INACTIVE);
//   form.append("variants", JSON.stringify(data.variants) || "");
//   form.append("description", data.description);
//   form.append("summary", data.summary);
//   form.append("metaDescription", data.metaDescription);
//   form.append("sizeChart", JSON.stringify(data.sizeChart));
//   form.append("hsnNumber", data.hsnNumber || "");

//   for (let i = 0; i < data.pictures?.length; i++) {
//     form.append("pictures", data.pictures[i]);
//   }

//   return axiosInstance.put(
//     `${config.API_ADMIN_PATH}/products/${data.productId}`,
//     form,
//     {
//       signal: controller?.signal,
//     }
//   );
// };

// export const getProducts = (
//   filters: ProductFilterTypes,
//   paginationData: PaginationDataType,
//   controller?: Controller
// ) => {
//   const { page, perPage } = paginationData;
//   const params = new URLSearchParams();
//   params.append("page", String(page));
//   params.append("per_page", String(perPage));

//   if (filters.productId) {
//     params.append("product_id", filters.productId);
//   }
//   if (filters.status) {
//     params.append("status", filters.status);
//   }
//   if (filters.title) {
//     params.append("title", filters.title);
//   }

//   return axiosInstance.get(
//     `${config.API_ADMIN_PATH}/products?${params.toString()}`,
//     {
//       signal: controller?.signal,
//     }
//   );
// };

// export const deleteProduct = (productId: string, controller: Controller) => {
//   return axiosInstance.delete(
//     `${config.API_ADMIN_PATH}/products/${productId}`,
//     {
//       signal: controller?.signal,
//     }
//   );
// };

// export const getProductById = (_id: string, controller?: Controller) => {
//   return axiosInstance.get(`${config.API_ADMIN_PATH}/products/${_id}`, {
//     signal: controller?.signal,
//   });
// };
