import z from "zod";
import { emailSchema, nameSchema, phoneSchema } from "./common";

export const profileEditSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
});
