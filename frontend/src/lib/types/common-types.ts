import { ColumnDef } from "@tanstack/react-table";
import { AddPlantFields, AddTestimonialType } from "./admin-types";
import {
  contactEnquirySchema,
  orderEnquirySchema,
  passwordChangeSchema,
  SubscriptionSchema,
} from "../schemas/common";
import z from "zod";
// import React from "react";
// import { AddGalleryField, AddProductFields } from "./admin-types";
// import { UserReviewSchema } from "../schemas/common";
// import { z } from "zod";
// import { productVariantSchema } from "../schemas/admin";

export type Controller = AbortController | undefined;
export interface PaginationDataType {
  page: number;
  perPage: number;
}

export interface Pagination {
  page: number;
  pageSize: number;
}

export interface PaginationProps {
  total: number;
  perPage: number;
  currentPage?: number;
  pageChange?: (page: number) => void;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface TableDataResponseType<TData> {
  data: TData[];
  total: number;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export interface DataTableActionType {
  actionType: string;
  actionIcon?: React.ReactNode;
  action: (id: string) => void;
  actionLabel?: string;
}

export type PlantTypes = Omit<AddPlantFields, "pictures" | "status"> & {
  _id: string;
  plantId: string;
  pictures: string[];
  status: string;
};

export type steperStatusType = "completed" | "incomplete";

export interface CategoryPageParamsProps {
  params: Promise<{ category: string }>;
}

export interface PlantsCardType {
  id: string;
  pictures: string[];
  title: string;
  slug: string;
  category: string;
}

type PropsAddProductFieldsOmitted = "status" | "picture";

export interface PlantDataType
  extends Omit<AddPlantFields, PropsAddProductFieldsOmitted> {
  _id: string;
  status: string;
  pictures: string[];
}

export type OrderEnquiryFields = z.infer<typeof orderEnquirySchema>;
export type ContactEnquiryFields = z.infer<typeof contactEnquirySchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

export type OrderEnquiryType = OrderEnquiryFields & {
  plantId: string;
  userId?: string;
};

export interface HomeCardType {
  _id?: string;
  small: string;
  smallColor: string;
  large: string;
  largeColor: string;
  link: {
    label: string;
    address: string;
    color: string;
  };
  picture: File | undefined | string | null;
}

export interface HomeCardsTypes {
  _id?: string;
  C1: HomeCardType;
  C2: HomeCardType;
}

export interface HomeGalleryType {
  _id?: string;
  G1: string;
  G2: string;
  G3: string;
}

export interface HomeVideoURLType {
  _id?: string;
  V1: string;
  V2: string;
}

export interface HomeGreenPlantType {
  _id: string;
  title: string;
  plantId: string;
  category: string;
  pictures: string[];
}

export interface HomeDataType {
  _id?: string;
  greenChoices: HomeGreenPlantType[];
  cards: HomeCardsTypes;
  gallery: HomeGalleryType;
  videos: string[];
}

export interface DefultHomeCardType {
  picture: string;
  small: string;
  big: string;
  linkLabel: string;
  linkAddress: string;
}

export interface PlantFilterType {
  sizes?: string[];
  care_levels?: string[];
  tags?: string[];
  page?: string | undefined;
  perPage?: string;
}

export interface CategoryPlantsHttpResDataType {
  message: string;
  data: { plants: PlantDataType[]; total: number };
}
export type EmailType = z.infer<typeof SubscriptionSchema>;

export type TestimonialType = Omit<AddTestimonialType, "status"> & {
  _id: string;
  status: string;
};
