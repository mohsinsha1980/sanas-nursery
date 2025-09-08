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

import z from "zod";
import { profileEditSchema } from "../schemas/user";

export interface UserInSessionTypes {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export type ProfileEditFormData = z.infer<typeof profileEditSchema>;

export interface OrderEnquiry {
  _id: string;
  plantId: {
    _id: string;
    title: string;
  };
  message: string;
  status: "pending" | "in_progress" | "resolved" | "closed";
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  _id: string;
  title: string;
  slug: string;
  picture: string;
}
