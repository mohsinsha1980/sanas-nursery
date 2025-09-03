// import { z } from "zod";
// import {
//   addCategorySchema,
//   addCouponSchema,
//   addPlantSchema,
//   AddressesSchema,
//   adminAddressSchema,
//   adminShippingAddressSchema,
//   editCategorySchema,
//   editCouponSchema,
//   editHomeSliderSchema,
//   editPlantSchema,
//   gallerySchema,
//   OrderFilterSchema,
//   PlantFilterSchema,
//   plantVariantSchema,
//   RevenueGraphSchema,
//   ReviewStatusSchema,
//   SizeSchema,
//   TaxChargesSchema,
//   TopSellingPlantSchema,
// } from "../schemas/admin";
// import {
//   DataTableActionType,
//   HomeBannerType,
//   ViewPlantDataType,
// } from "./common-types";
// import { EmailType } from "./public-types";
// import { Address, SupportType } from "./user-types";

import z from "zod";
import {
  addPlantSchema,
  editPlantSchema,
  PlantFilterSchema,
} from "../schemas/admin";
import { DataTableActionType, HomeCardType } from "./common-types";
import { MASTER_DATA_TYPE } from "../constants";

export interface SelectOption {
  label: string;
  value: string;
}

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
  retypePassword: string;
}

// export interface CategoryListType {
//   _id: string;
//   uuid: string;
//   label: string;
//   slug: string;
//   level: string;
//   l1_category?: string;
//   l2_category?: string;
//   active: boolean;
//   children?: CategoryListType[];
// }

// export interface categoryObj {
//   l1_category: string;
//   l2_category: string;
//   picture: File | undefined;
//   level: string;
//   slug: string;
//   label: string;
//   description: string;
// }

// export interface Category {
//   uuid: string;
//   _id: string;
//   label: string;
//   slug: string;
//   level: string;
//   l1_category?: string;
//   l2_category?: string;
//   picture?: string | File | null | undefined;
//   description: string;
// }

export interface MasterDataOption extends SelectOption {
  _id: string;
}

export type AddMasterDataProps = {
  onAdd: (data: MasterDataOption) => void;
  onClose?: () => void;
};

// export type AddTaxFields = z.infer<typeof TaxChargesSchema>;

// export type AddAddressFields = z.infer<typeof AddressesSchema>;

// export interface TaxDataOption {
//   _id: string;
//   label: string;
//   value: number;
// }

// export interface AddressDataOption {
//   _id: string;
//   label: string;
//   value: string;
// }

export interface MasterData {
  tags: MasterDataOption[];
}

export type MasterDataFields =
  (typeof MASTER_DATA_TYPE)[keyof typeof MASTER_DATA_TYPE];
// export type AddCategoryFields = z.infer<typeof addCategorySchema>;
// export type EditCategoryFields = z.infer<typeof editCategorySchema>;
export type AddPlantFields = z.infer<typeof addPlantSchema>;
export type EditPlantFields = z.infer<typeof editPlantSchema>;
// export type PlantVariantsTypes = z.infer<typeof plantVariantSchema>;
// export type EditCouponSchema = z.infer<typeof editCouponSchema>;

export interface PlantTableDataType {
  title: string;
  plantId: string;
  status: string;
  actions: DataTableActionType[];
  picture: string;
}

export interface UpdateHomeCardTypes extends HomeCardType {
  field: string;
}

// export interface ReviewTableDataType {
//   _id: string;
//   plantId: string;
//   plantTitle: string;
//   description: string;
//   user: string;
//   review: string;
//   rating: number;
//   status: boolean;
//   actions: DataTableActionType[];
// }

// export interface ReviewsFilterDataType {
//   plantTitle?: string;
//   rating?: string;
//   status?: string;
// }

// export interface FilteredCatType {
//   l1Categories: SelectOption[];
//   l2Categories: SelectOption[];
//   l3Categories: SelectOption[];
// }

// export type AddSizeType = z.infer<typeof SizeSchema>;

// export interface SizePropertyType {
//   key: string;
//   value: string;
// }

// type MasterDataOptionFieldType = { label: string; value: string };
// export type MasterDataOptionsType = {
//   colors: MasterDataOptionFieldType[];
//   materials: MasterDataOptionFieldType[];
//   styles: MasterDataOptionFieldType[];
//   sizes: MasterDataOptionFieldType[];
//   highestMrp?: number;
// };

// export interface UpdateHomeBannerTypes extends HomeBannerType {
//   section: string;
//   field: string;
// }

// export type AddGalleryField = z.infer<typeof gallerySchema>;
// export type AddHomeSliderType = z.infer<typeof homeSliderSchema>;
// export type EditHomeSliderType = z.infer<typeof editHomeSliderSchema>;
// export type ReviewStatusType = z.infer<typeof ReviewStatusSchema>;

// export type ReviewStatusDataProps = {
//   data: ReviewTableDataType;
//   onEdit: (data: ReviewTableDataType) => void;
//   onClose: () => void;
// };

// export interface ReviewsDataType {
//   plantId: string;
//   plantTitle: string;
//   user: string;
//   review: string;
//   rating: number;
//   status: boolean;
//   actions: DataTableActionType[];
// }

// export interface UpdateReviewType extends ReviewStatusType {
//   _id: string;
// }

export interface UserTableActionType {
  actionType: string;
  actionIcon?: React.ReactNode;
  action: (user: UserTableDataType) => void;
}

export interface UserTableDataType {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  actions: UserTableActionType[];
  role: string;
}

// export interface UserAddressesDataType {
//   _id: string;
//   address1: string;
//   address2: string;
//   city: string;
//   state: string;
//   zip: string;
//   isPrimary: boolean;
// }

// export interface ReviewData {
//   _id: string;
//   description: string;
//   title: string;
//   status: boolean;
//   rating: number;
//   user: {
//     _id: string;
//     first_name: string;
//     last_name: string;
//   };
//   plantId: {
//     _id: string;
//     title: string;
//   };
// }

// export type AddCouponTypes = z.infer<typeof addCouponSchema>;

// export interface PromotionTableActionType {
//   actionType: string;
//   actionIcon?: React.ReactNode;
//   action: (coupon: PromotionTableDataType) => void;
// }

// type EditPromotionData = z.infer<typeof editCouponSchema>;

// export interface PromotionTableDataType extends EditPromotionData {
//   actions: PromotionTableActionType[];
// }

// export interface EditCouponDataType extends EditCouponSchema {
//   couponId: string;
// }

// export interface TnxTableDataType {
//   tnxId: string;
//   userId: {
//     phone: string;
//   };
//   amount: number;
//   status: string;
//   method: string;
//   actions: DataTableActionType[];
// }

// export interface TransactionType {
//   _id: string;
//   tnxId: string;
//   userId: UserType;
//   amount: number;
//   currency: string;
//   status: string;
//   method: string;
//   paymentId: string;
//   metadata: {
//     orderId?: string;
//     description?: string;
//     reason?: string;
//   };
//   refunds: [];
//   createdAt: string;
// }

// export type UserType = Omit<UserTableDataType, "actions">;

// export interface RazorpayPaymentType {
//   id: string;
//   entity: string;
//   amount: number;
//   currency: string;
//   status: string;
//   method: string;
//   created_at: number;
//   description?: string;
//   bank?: string;
//   wallet?: string;
//   vpa?: string;
//   card_id?: string;
//   card?: {
//     id: string;
//     last4: string;
//     network: string;
//     type: "debit" | "credit";
//   };
// }

// export type RevenueGraphFields = z.infer<typeof RevenueGraphSchema>;
// export type TopSellingPlantFields = z.infer<typeof TopSellingPlantSchema>;

// export interface CompletedOrderTableDataType {
//   _id: string;
//   orderId: string;
//   phone: string;
//   currentStatus: string;
//   orderDate: string;
//   actions: DataTableActionType[];
// }

// export interface OrderTableData {
//   _id: string;
//   orderId: string;
//   phone: string;
//   currentStatus: string;
//   orderDate: string;
//   actions: DataTableActionType[];
// }

// export interface PromotionData {
//   _id: string;
//   promoCode: string;
//   discount: string;
//   totalPromotions: number;
//   startDate: string;
//   endDate: string;
//   status: boolean;
//   minPurchase: number;
//   maxDiscount: number;
//   description: string;
// }

// export interface SubscribersDataType {
//   _id: string;
//   email: string;
//   createdAt: string;
// }

// export interface SubscriptionTableDataType extends EmailType {
//   _id: string;
//   createdDate: string;
// }

// export interface SupportTableDataType {
//   _id: string;
//   email: string;
//   issue: string;
//   tnxId?: string;
//   description: string;
//   orderId: string;
//   status: boolean;
//   actions: SupportTableActionType[];
// }

// export interface SupportTableActionType {
//   actionType: string;
//   actionIcon?: React.ReactNode;
//   action: (coupon: SupportTableDataType) => void;
// }

// export type OrderStatsTypes = {
//   orderDate: Date;
//   totalRevenue: number;
//   OrdersCount: number;
// };

// export type FormatedRevenueGraphData = { date: string; revenue: number };

// export interface DashboardStatsTypes {
//   ordersToday: {
//     count: number;
//     revenue: number;
//   };
//   deliveredAsExpected: number;
//   pendingAsExpected: number;
//   ordersInCurrentMonth: {
//     count: number;
//     revenue: number;
//   };
// }

// export interface PlantSale {
//   plantId: string;
//   title: string;
//   countSold: number;
//   revenue: number;
// }

// export interface TopSellingPlant {
//   plantId: string;
//   title: string;
//   countSold: number;
//   revenue: number;
// }

// export interface InventoryReportType {
//   plantId: string;
//   title: string;
//   picture: string;
//   variants: {
//     _id: string;
//     color: {
//       label: string;
//       value: string;
//     };
//     size: string;
//     availableQuantity: number;
//     soldQuantity: number;
//     sellingPrice: number;
//   }[];
// }

// export type OrderFilterTypes = z.infer<typeof OrderFilterSchema>;

// export type OrderItemType = {
//   _id: string;
//   plantId: string;
//   title: string;
//   picture: string;
//   size: string;
//   color: {
//     value: string;
//     label: string;
//   };
//   quantity: number;
//   mrp: number;
//   discountPercent: number;
//   totalAmount: number;
//   taxRate: number;
//   hsnNumber?: string;
//   link?: string;
// };

// export interface OrderItemDetailsType extends Omit<OrderItemType, "plantId"> {
//   plantId: ViewPlantDataType;
// }

// export type PriceDataType = {
//   mrp: number;
//   discountOnMrp?: number;
//   discountOnCoupon?: number;
//   deliveryCharges: number;
//   effectivePrice: number;
// };

// export type OrderStatusType = {
//   status: string;
//   date: string;
// };

// export type PickupType = {
//   pickup_location?: string;
//   pickup_scheduled_date?: string;
//   pickup_token_number?: string;
//   manifest_url?: string;
//   label_url?: string;
// };

// export type OrderBaseType = {
//   _id: string;
//   orderId: string;
//   userId: string;
//   paymentId?: string;
//   tnxId?: string; // Bill ID
//   orderDate: string;
//   channel_id?: string;
//   pickup?: PickupType;
//   comment?: string;
//   shipment_id?: string;
//   orderItems: OrderItemType[];
//   appliedCoupon?: {
//     promotionId?: string;
//     promoCode?: string;
//   };
//   priceData: PriceDataType;
//   billingAddress: Address;
//   shippingAddress: Address;
//   estimateDeliveryDate: string;
//   deliveryDate?: string;
//   currentStatus: string;
//   orderStatuses: OrderStatusType[];
//   status?: string;
//   status_code?: string;
//   shiprocketId: string;
// };

// export interface OrderType
//   extends Omit<OrderBaseType, "userId" | "shiprocketId"> {
//   userId: UserType;
//   shiprocketId?: {
//     _id: string;
//     shiprocket_orderId?: string;
//     shipment_id?: string;
//     awb_code?: string;
//     courier_company_id?: number;
//     courier_name?: string;
//     delivery_charges?: number;
//     pickup?: PickupObjType;
//     status?: string;
//     trackingStatus?: string;
//   };
// }

// export interface PickupObjType {
//   pickup_location?: string;
//   pickup_scheduled_date?: string;
//   pickup_token_number?: string;
//   manifest_url?: string;
//   label_url?: string;
//   pickup_pincode?: string;
// }

// export type AdminAddressFormData = z.infer<typeof adminAddressSchema>;

// export interface SupportDataType extends SupportType {
//   _id: string;
//   status: boolean;
// }

// export interface PickupLocation {
//   _id: string;
//   pickup_location: string;
//   name: string;
//   email: string;
//   phone: number;
//   address: string;
//   address_2?: string;
//   city: string;
//   state: string;
//   country: string;
//   pin_code: number;
// }

// export type AdminShippingAddressFormData = z.infer<
//   typeof adminShippingAddressSchema
// >;

// export interface ContactFormTableDataType {
//   _id: string;
//   full_name: string;
//   phone: string;
//   email: string;
//   message: string;
//   pictures: [string];
//   file: string;
//   createdAt?: string;
//   actions: ContactFormTableActionType[];
// }

// export interface ContactFormDataType {
//   _id: string;
//   full_name: string;
//   phone: string;
//   email: string;
//   message: string;
//   pictures: [string];
//   file: string;
//   createdAt?: string;
// }

// export interface ContactFormTableActionType {
//   actionType: string;
//   actionIcon?: React.ReactNode;
//   action: (coupon: ContactFormDataType) => void;
// }

export type PlantFilterTypes = z.infer<typeof PlantFilterSchema>;
