// import { z } from "zod";
// import {
//   addressSchema,
//   editProfileEmail,
//   editProfilePassword,
//   editProfileSchema,
//   supportschema,
//   updateProfilePassword,
// } from "../schemas/user";
// import { OrderBaseType } from "./admin-types";
// import { VariantType } from "./common-types";

export interface UserInSessionTypes {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

// export interface AddToCartTypes {
//   productId: string;
//   size: string;
//   color: VariantType;
//   quantity?: number;
// }

// export interface UpdateUserProfileTypes {
//   _id: string;
//   first_name?: string;
//   last_name?: string;
//   email?: string;
// }

// export interface Address {
//   _id: string;
//   fullName: string;
//   phone: string;
//   isPrimary: boolean;
//   address1: string;
//   address2?: string;
//   city: string;
//   state: string;
//   zip: string;
// }

// export interface DeleteAddressType {
//   userId: string;
//   addressId: string;
// }

// export interface EditProfileProps {
//   user: EditProfileFields;
//   onClose: () => void;
// }

// export interface PasswordProps {
//   onClose: () => void;
//   user: string;
// }

// export interface EditProfileEmailProps {
//   onClose: () => void;
// }

// export type EditProfileFields = z.infer<typeof editProfileSchema>;
// export type EditProfileEmail = z.infer<typeof editProfileEmail>;
// export type EditProfilePassword = z.infer<typeof editProfilePassword>;
// export type UpdateProfilePassword = z.infer<typeof updateProfilePassword>;

// export type AddressFormData = z.infer<typeof addressSchema>;

// export interface CartItem {
//   itemId: string;
//   productId: string;
//   title: string;
//   slug: string;
//   size: string;
//   color: {
//     label: string;
//     value: string;
//   };
//   pictures: string;
//   quantity: number;
//   inventory: number;
//   mrp: number;
//   discountPercent: number;
//   discountAmt: number;
//   sellingPrice: number;
//   totalAmount: number;
//   isVariantAvl: boolean;
//   isSelected: boolean;
//   link: string;
// }

// export interface PriceData {
//   mrp: number;
//   discountOnMrp: number;
//   discountOnCoupon: number;
//   totalSaving: number;
//   subTotal: number;
//   deliveryCharges: number;
//   effectivePrice: number;
// }

// export interface CartOrdersDataTypes {
//   cartItems: CartItem[];
//   priceData: PriceData;
//   appliedCoupon: { _id: string; promoCode: string } | null;
//   couponRemovalMsg?: string;
//   estimateDeliveryDate?: string;
// }

// export interface CartItemStatus {
//   itemId: string;
//   quantity: number;
//   isSelected: boolean;
// }

// export interface CartState {
//   itemState: CartItemStatus[];
//   promoCode: string;
//   couponId?: string;
//   shippingAddress: Address | null;
//   billingAddress: Address | null;
//   totalCartItems: number | null;
// }

// export interface cartOrdersStateTypes {
//   cartOrders: CartItemStatus[];
//   priceData: PriceData;
//   appliedCoupon: { _id: string; promoCode: string } | null;
//   couponRemovalMsg?: string;
// }

// export interface CreateOrderDataType extends cartOrdersStateTypes {
//   shippingAddress: Address;
//   billingAddress: Address;
//   total: number;
// }

// export interface AddAddressDialogProps {
//   open: boolean;
//   setOpen: (open: boolean) => void;
//   type: "shipping" | "both" | "billing";
//   onSave?: (address: Address) => void;
//   checked?: boolean;
// }

// export interface BillingAddress {
//   fullName: string;
//   phone: string;
//   address1: string;
//   address2?: string;
//   city: string;
//   state: string;
//   zip: string;
// }

// export interface EmailVerificationData {
//   identifier: string;
// }

// export interface EmailValidationData {
//   identifier: string;
//   otp: string;
// }

// export type UserOrderType = OrderBaseType;

// export type SupportType = z.infer<typeof supportschema>;

// export interface GetTopCourierPayload {
//   // userId: string;
//   items: CartItemStatus[];
//   zip: string;
// }

// export interface Courier {
//   courier_name: string;
//   courier_company_id: number;
//   rating?: number;
//   delivery_performance?: number;
//   estimated_delivery_days: string;
//   freight_charge: number;
// }
