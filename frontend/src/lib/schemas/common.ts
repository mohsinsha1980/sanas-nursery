import z from "zod";
import { emailRegEx } from "../helper";

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .min(2, { message: "Name must be at least 2 characters" })
  .max(50, { message: "Name must be less than 50 characters" })
  .regex(/^[a-zA-Z\s]+$/, {
    message: "Name can only contain letters and spaces",
  })
  .nonempty("Name is required");

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .max(100, { message: "Email must be less than 100 characters" })
  .regex(emailRegEx, { message: "Please enter a valid email address" })
  .nonempty("Email is required");

export const phoneSchema = z
  .string()
  .trim()
  .min(1, { message: "Phone number is required" })
  .refine((val) => val.replace(/\D/g, "").length <= 10, {
    message: "Phone number must be of 10 digits",
  })
  .regex(/^[+]?[\d\s\-\(\)]+$/, {
    message: "Please enter a valid phone number",
  });

export const messageSchema = z
  .string()
  .trim()
  .min(1, { message: "Message is required" })
  .min(10, { message: "Message must be at least 10 characters" })
  .max(1000, { message: "Message must be less than 1000 characters" });

export const preferredContactTimeSchema = z
  .string()
  .trim()
  .max(50, {
    message: "Preferred contact time must be less than 50 characters",
  })
  .optional();

export const orderEnquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
  preferredContactTime: preferredContactTimeSchema,
});

export const SubscriptionSchema = z.object({
  email: emailSchema,
});

export const contactEnquirySchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  message: messageSchema,
});

export const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
