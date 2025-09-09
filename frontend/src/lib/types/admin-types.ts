import z from "zod";
import {
  addPlantSchema,
  editPlantSchema,
  PlantFilterSchema,
  testimonialSchema,
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

export interface MasterDataOption extends SelectOption {
  _id: string;
}

export type AddMasterDataProps = {
  onAdd: (data: MasterDataOption) => void;
  onClose?: () => void;
};

export interface MasterData {
  tags: MasterDataOption[];
}

export type MasterDataFields =
  (typeof MASTER_DATA_TYPE)[keyof typeof MASTER_DATA_TYPE];
export type AddPlantFields = z.infer<typeof addPlantSchema>;
export type EditPlantFields = z.infer<typeof editPlantSchema>;

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

type MasterDataOptionFieldType = { label: string; value: string };
export type MasterDataOptionsType = {
  tags: MasterDataOptionFieldType[];
};

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

export type PlantFilterTypes = z.infer<typeof PlantFilterSchema>;

export type AddTestimonialType = z.infer<typeof testimonialSchema>;
export type EditTestimonialType = z.infer<typeof testimonialSchema>;

export interface OrderEnquiryTableDataType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContactTime?: string;
  plantTitle: string;
  plantPicture: string;
  status: "pending" | "contacted" | "resolved" | "closed";
  createdAt: string;
  actions: DataTableActionType[];
}

export interface OrderEnquiryDataType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferredContactTime?: string;
  plantId: {
    _id: string;
    title: string;
    pictures: string[];
  };
  userId: string;
  status: "pending" | "contacted" | "resolved" | "closed";
  createdAt: string;
}

export interface EnquiryFilterTypes {
  status?: "pending" | "contacted" | "resolved" | "closed";
}

export interface ContactEnquiryDataType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "pending" | "contacted" | "resolved" | "closed";
  createdAt: string;
}

export interface ContactEnquiryFilterTypes {
  status?: "pending" | "contacted" | "resolved" | "closed";
}

// export interface PlantTableDataType {
//   title: string;
//   plantId: string;
//   status: string;
//   actions: DataTableActionType[];
//   picture: string;
// }
