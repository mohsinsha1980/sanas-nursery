import { ColumnDef } from "@tanstack/react-table";
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
}

export type steperStatusType = "completed" | "incomplete";

// export interface ProductCardType {
//   id: string | number;
//   pictures: string[];
//   title: string;
//   sellingPrice: number;
//   mrp?: number;
//   discount?: number;
//   l1_category: string;
//   l2_category: string;
//   l3_category?: string;
//   slug: string;
//   avgRating?: number | 0;
// }

// export interface WishlistProductCardType {
//   id: string;
//   pictures: string[];
//   isInCart: boolean;
//   title: string;
//   sellingPrice: number;
//   mrp?: number;
//   discount?: number;
//   l1_category: string;
//   l2_category: string;
//   l3_category?: string;
//   taxRate: number;
//   slug: string;
//   variants: VarientDataType[];
// }

// export interface SampleTableDataType {
//   id: string;
//   amount: number;
//   status: string;
//   email: string;
//   actions?: DataTableActionType[];
// }

// export interface CategoryResponseType {
//   l1_category: string;
//   l2_category: string;
//   label: string;
//   level: string;
//   picture: string;
//   slug: string;
//   uuid: string;
//   _id: string;
//   status: string;
//   description: string;
// }

// export interface L1CategoryHttpResponseDataType<TData> {
//   message: string;
//   data: { l1: TData; l2: TData[] };
// }

// export interface L2CategoryHttpResponseDataType<TData> {
//   message: string;
//   data: { l1: TData; l2: TData; l3: TData[] };
// }

// export type CategoryProps = {
//   params: Promise<{ slug: string }>;
// };

// export interface CategoryPageParamsProps {
//   params: Promise<{ category_l1: string }>;
// }

// export interface SubCategoryPageParamsProps {
//   params: Promise<{ category_l2: string; category_l1: string }>;
// }

// export interface L3CategoryPageParamsProps {
//   params: Promise<{
//     category_l3: string;
//     category_l2: string;
//     category_l1: string;
//   }>;
// }

// export interface L3CategoryProductsHttpResponseDataType<TData> {
//   message: string;
//   data: {
//     l1: TData;
//     l2: TData;
//     l3: TData;
//     products: ProductDataType[];
//     total: number;
//   };
// }

// export interface ProductFilterType {
//   colors?: string[];
//   sizes?: string[];
//   material?: string[];
//   style?: string[];
//   page?: string | undefined;
//   perPage?: string;
//   sort?: string | undefined;
// }

// export interface SizeChartPropertyType {
//   _id: string;
//   key: string;
//   value: number;
// }

// export interface ProductSizeChartType {
//   _id: string;
//   label: string;
//   value: string;
//   properties: SizeChartPropertyType[];
//   length?: number;
// }

// type PropsAddProductFieldsOmitted =
//   | "status"
//   | "l1_category"
//   | "l2_category"
//   | "l3_category"
//   | "sizeChart";

// export interface ProductDataType
//   extends Omit<AddProductFields, PropsAddProductFieldsOmitted> {
//   _id: string;
//   status: string;
//   picture: string;
//   label: string;
//   l1_category: {
//     _id: string;
//     uuid: string;
//     label: string;
//     l1_category: string;
//     l2_category: string;
//     slug: string;
//     picture: string;
//     level: string;
//     status: string;
//     description: string;
//   };
//   l2_category: {
//     _id: string;
//     uuid: string;
//     label: string;
//     l1_category: string;
//     l2_category: string;
//     slug: string;
//     picture: string;
//     level: string;
//     status: string;
//     description: string;
//   };
//   l3_category?: {
//     _id: string;
//     uuid: string;
//     label: string;
//     l1_category: string;
//     l2_category: string;
//     slug: string;
//     picture: string;
//     level: string;
//     status: string;
//     description: string;
//   };
//   sizeChart: ProductSizeChartType[];
//   totalReviews?: number;
//   avgRating?: number;
// }

// export interface ReviewDataType {
//   _id?: string;
//   title?: string;
//   description?: string;
//   rating: number;
//   productId: string;
//   status: boolean;
//   user_id?: string;
//   user?: ReviewsUserDataType;
// }

// export interface L1CategoryProductsHttpResponseDataType<TData> {
//   message: string;
//   data: { l1: TData; products: ProductDataType[]; total: number };
// }

// export interface L2CategoryProductsHttpResponseDataType<TData> {
//   message: string;
//   data: { l1: TData; l2: TData; products: ProductDataType[]; total: number };
// }

// export type catFilterOptionsType = {
//   label: string;
//   url: string;
// };

// export type MainCarouselSlideType = {
//   _id: string;
//   link: {
//     label: string;
//     address: string;
//     color?: string;
//   };
//   h1: string;
//   h2: string;
//   h3: string;
//   h1Color?: string;
//   h2Color?: string;
//   h3Color?: string;
//   picture: File | undefined | string;
//   status: boolean;
// };

// export interface DefultHomeBannerType {
//   picture: string;
//   small: string;
//   big: string;
//   linkLabel: string;
//   linkAddress: string;
// }

// export interface HomeProductCardType extends ProductCardType {
//   avgRating: number;
//   totalReviews: number;
//   l2_category_label: string;
//   l3_category_label: string;
// }

// export interface HomeBannerType {
//   _id?: string;
//   small: string;
//   smallColor: string;
//   large: string;
//   largeColor: string;
//   link: {
//     label: string;
//     address: string;
//     color: string;
//   };
//   picture: File | undefined | string;
//   pictureUrl?: string;
// }

// export interface HomeBannerTopType {
//   _id?: string;
//   A1: HomeBannerType;
//   B1: HomeBannerType;
//   B2: HomeBannerType;
//   B3: HomeBannerType;
//   C1: HomeBannerType;
// }

// export interface HomeBannerMiddleType {
//   _id?: string;
//   D1: HomeBannerType;
// }

// export interface HomeBannerBottomType {
//   _id?: string;
//   E1: HomeBannerType;
//   F1: HomeBannerType;
// }

// export interface HomeBannerSectionType {
//   _id?: string;
//   top: HomeBannerTopType;
//   middle: HomeBannerMiddleType;
//   bottom: HomeBannerBottomType;
//   mainCorousel: MainCarouselSlideType[];
// }

// export interface GalleryDataField extends AddGalleryField {
//   _id: string;
// }

// export interface GalleryHttpResponseDataType<TData> {
//   message: string;
//   data: TData[];
// }

// export interface TrendyProductDataType extends ProductDataType {
//   avgRating: number;
//   totalReviews: number;
// }

// export interface TrendyProductsHttpResponseDataType {
//   message: string;
//   data: {
//     newArrivals: TrendyProductDataType[];
//     bestSellers: TrendyProductDataType[];
//     topRated: TrendyProductDataType[];
//   };
// }

// // export interface EditReviewDataType {
// //   _id: string;
// //   description: string;
// //   productId : ReviewsProductDataType;
// //   rating: number;
// //   status: boolean;
// //   title: string;
// //   user: ReviewsUserDataType;
// // }

// // export interface ReviewsProductDataType {
// //   _id: string;
// //   title: string;
// // }

// export interface ReviewsUserDataType {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   active: boolean;
// }

// export type ReviewFormDataType = z.infer<typeof UserReviewSchema>;

// export interface CartProductsDataType {
//   color: VariantType;
//   productId: string;
//   quantity: number;
//   size: string;
//   userId: string;
//   _id: string;
// }

// export type VarientDataType = z.infer<typeof productVariantSchema>;

// export interface ViewProductDataType
//   extends Omit<AddProductFields, PropsAddProductFieldsOmitted> {
//   _id: string;
//   status: string;
//   picture: string;
//   label: string;
//   l1_category: {
//     _id: string;
//     uuid: string;
//     label: string;
//     l1_category: string;
//     l2_category: string;
//     slug: string;
//     picture: string;
//     level: string;
//     status: string;
//     description: string;
//   };
//   l2_category: {
//     _id: string;
//     uuid: string;
//     label: string;
//     l1_category: string;
//     l2_category: string;
//     slug: string;
//     picture: string;
//     level: string;
//     status: string;
//     description: string;
//   };
//   l3_category?: {
//     _id: string;
//     uuid: string;
//     label: string;
//     l1_category: string;
//     l2_category: string;
//     slug: string;
//     picture: string;
//     level: string;
//     status: string;
//     description: string;
//   };
//   sizeChart: ProductSizeChartType[];
//   dimensions: {
//     height: string;
//     weight: string;
//     length: string;
//     width: string;
//   };
// }

// export interface TopSellingProductsChartType {
//   month: string;
//   product_1?: number;
//   product_2?: number;
//   product_3?: number;
//   product_4?: number;
//   product_5?: number;
// }

// export interface TopSellingProductsChartConfigType {
//   product_1?: {
//     label: string;
//     color: string;
//   };
//   product_2?: {
//     label: string;
//     color: string;
//   };
//   product_3?: {
//     label: string;
//     color: string;
//   };
//   product_4?: {
//     label: string;
//     color: string;
//   };
//   product_5?: {
//     label: string;
//     color: string;
//   };
// }

// export interface HomeClientHttpResponseDataType<SliderData, GalleryTData> {
//   message: string;
//   data: {
//     galleryData: GalleryTData[];
//     mainSlider: SliderData[];
//   };
// }
