import config from "@/config/env-config";
import { axiosInstance } from "@/config/http";
import { AxiosResponse } from "axios";
import { Controller, PaginationDataType } from "../types/common-types";
import {
  AddPlantFields,
  EditPlantFields,
  PasswordData,
  PlantFilterTypes,
} from "../types/admin-types";
import { STATUS } from "../helper";

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

export const getMasterData = (controller?: Controller) => {
  return axiosInstance.get(`${config.API_ADMIN_PATH}/master-data`, {
    signal: controller?.signal,
  });
};

export const updatePassword = (data: PasswordData, controller: Controller) => {
  return axiosInstance.post(`${config.API_ADMIN_PATH}/updatePassword`, data, {
    signal: controller?.signal,
  });
};

export const createPlant = (data: AddPlantFields, controller?: Controller) => {
  const form = new FormData();
  form.append("title", data.title);
  form.append("slug", data.slug);
  form.append("summary", data.summary);
  form.append("category", data.category);
  form.append("size", data.size);
  form.append("careLevel", data.careLevel || "");
  form.append("metaDescription", data.metaDescription || "");
  form.append("details", data.details);
  form.append("description", data.description);
  form.append("status", data.status ? STATUS.ACTIVE : STATUS.INACTIVE);

  if (data.specifications?.length) {
    form.append("specifications", JSON.stringify(data.specifications));
  }
  if (data.faqs?.length) {
    form.append("faqs", JSON.stringify(data.faqs));
  }
  if (data.tags?.length) {
    form.append("tags", JSON.stringify(data.tags));
  }
  if (data.pictures?.length) {
    for (let i = 0; i < data.pictures.length; i++) {
      form.append("pictures", data.pictures[i]);
    }
  }
  return axiosInstance.post(`${config.API_ADMIN_PATH}/plants`, form, {
    signal: controller?.signal,
  });
};

export const updatePlant = (data: EditPlantFields, controller?: Controller) => {
  const form = new FormData();
  form.append("title", data.title);
  form.append("slug", data.slug);
  form.append("summary", data.summary);
  form.append("category", data.category);
  form.append("size", data.size);
  form.append("careLevel", data.careLevel || "");
  form.append("metaDescription", data.metaDescription || "");
  form.append("details", data.details);
  form.append("description", data.description);
  form.append("status", data.status ? STATUS.ACTIVE : STATUS.INACTIVE);

  if (data.specifications?.length) {
    form.append("specifications", JSON.stringify(data.specifications));
  }
  if (data.faqs?.length) {
    form.append("faqs", JSON.stringify(data.faqs));
  }
  if (data.tags?.length) {
    form.append("tags", JSON.stringify(data.tags));
  }
  if (data.pictures?.length) {
    for (let i = 0; i < data.pictures.length; i++) {
      form.append("pictures", data.pictures[i]);
    }
  }
  return axiosInstance.put(`${config.API_ADMIN_PATH}/plants/${data.plantId}`, form, {
    signal: controller?.signal,
  });
};

export const deletePlant = (plantId: string, controller: Controller) => {
  return axiosInstance.delete(`${config.API_ADMIN_PATH}/plants/${plantId}`, {
    signal: controller?.signal,
  });
};

export const getPlants = (
  filters: PlantFilterTypes,
  paginationData: PaginationDataType,
  controller?: Controller
) => {
  const { page, perPage } = paginationData;
  const params = new URLSearchParams();
  params.append("page", String(page));
  params.append("per_page", String(perPage));

  if (filters.plantId) {
    params.append("plant_id", filters.plantId);
  }
  if (filters.status) {
    params.append("status", filters.status);
  }
  if (filters.title) {
    params.append("title", filters.title);
  }

  return axiosInstance.get(
    `${config.API_ADMIN_PATH}/plants?${params.toString()}`,
    {
      signal: controller?.signal,
    }
  );
};

export const getPlantById = (plantId: string, controller?: Controller) => {
  return axiosInstance.get(`${config.API_ADMIN_PATH}/plants/${plantId}`, {
    signal: controller?.signal,
  });
};
