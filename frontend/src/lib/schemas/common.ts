// import { z } from "zod";
// import { ACCEPTED_FILE_TYPES, ALLOWED_MAX_FILE_SIZE } from "../constants";
// import { emailRegEx, phoneRegEx } from "../helper";

import z from "zod";
import { emailRegEx } from "../helper";

export const MAX_FILE_SIZE = 500000;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const nameSchema = z
  .string()
  .trim()
  .min(1, { message: "Name is required" })
  .min(2, { message: "Name must be at least 2 characters" })
  .max(50, { message: "Name must be less than 50 characters" })
  .regex(/^[a-zA-Z\s]+$/, {
    message: "Name can only contain letters and spaces",
  });

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .max(100, { message: "Email must be less than 100 characters" })
  .regex(emailRegEx, { message: "Please enter a valid email address" });

export const phoneSchema = z
  .string()
  .trim()
  .min(1, { message: "Phone number is required" })
  .refine((val) => val.replace(/\D/g, "").length >= 10, {
    message: "Phone number must be at least 10 digits",
  })
  .refine((val) => val.replace(/\D/g, "").length <= 15, {
    message: "Phone number must be less than 15 digits",
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

// const optionSchema = z.object({
//   label: z.string(),
//   value: z.string(),
//   disable: z.boolean().optional(),
// });

// export const sampleFormSchema = z
//   .object({
//     name: z.string().nonempty("Name is required"),
//     email: z
//       .string()
//       .nonempty("Email is required")
//       .email("Invalid email address"),
//     password: z
//       .string()
//       .nonempty("Password is required")
//       .min(8, "Password must be at least 8 characters long."),
//     category: z.string().nonempty("Category is required"),
//     date_of_birth: z.date({
//       errorMap: (issue, ctx) => {
//         if (ctx.data === undefined) {
//           return {
//             message: "A date of birth is required.",
//           };
//         } else {
//           return {
//             message: ctx.defaultError,
//           };
//         }
//       },
//     }),
//     remember: z.boolean({
//       errorMap: (issue, ctx) => {
//         if (ctx.data === undefined) {
//           return {
//             message: "You must provide the consent",
//           };
//         } else {
//           return {
//             message: ctx.defaultError,
//           };
//         }
//       },
//     }),
//     time: z.enum(["morning", "afternoon", "evening"], {
//       errorMap: (issue, ctx) => ({
//         message: "You need to select at least one option",
//       }),
//     }),
//     active: z.boolean({
//       errorMap: (issue, ctx) => {
//         if (ctx.data === undefined) {
//           return {
//             message: "You must switch to active",
//           };
//         } else {
//           return {
//             message: ctx.defaultError,
//           };
//         }
//       },
//     }),
//     smart_category: z.string().nonempty("Smart Category is required"),
//     l1_category: z.string().nonempty("L1 Category is required"),
//     picture: z
//       .instanceof(File, { message: "Picture is required" })
//       .refine(
//         (file) => {
//           if (file.size < ALLOWED_MAX_FILE_SIZE) {
//             return true;
//           }
//           return false;
//         },
//         {
//           message: `Max file size is 500KB.`,
//         }
//       )
//       .refine(
//         (file) => {
//           if (ACCEPTED_IMAGE_TYPES.includes(file?.type)) {
//             return true;
//           }
//           return false;
//         },
//         {
//           message: `.jpg, .jpeg, .png and .webp files are accepted`,
//         }
//       ),
//     range: z.array(z.number()),
//     color: z.string().nonempty("Color is required"),
//     material: z
//       .array(optionSchema)
//       .nonempty("At least one variant is required"),
//     colors: z.array(optionSchema).nonempty("At least one color is required"),
//     details: z.string().nonempty("Details is required"),
//     otp: z.string().min(6, {
//       message: "Your one-time password must be 6 characters.",
//     }),
//   })
//   .superRefine((data, ctx) => {
//     if (data.password === data.email) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["email"],
//         fatal: true,
//         message: "Email & Password should not be the same",
//       });
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["password"],
//         fatal: true,
//         message: "Email & Password should not be the same",
//       });
//     }
//   });

// export const filterSchema = z.object({
//   category: z.string(),
//   colors: z.array(optionSchema).optional(),
//   materials: z.array(optionSchema).optional(),
//   sizes: z.array(optionSchema).optional(),
//   styles: z.array(optionSchema).optional(),
//   priceRange: z.array(z.number()).optional(),
//   discount: z.string(),
// });

// export const UserReviewSchema = z.object({
//   rating: z
//     .number()
//     .min(1, "Rating must be at least 1")
//     .max(5, "Rating must be at most 5"),
//   title: z.string().optional(),
//   description: z.string().optional(),
// });

// export const CheckAvailabilitySchema = z.object({
//   pincode: z
//     .string()
//     .nonempty("Pincode is required")
//     .regex(
//       PINCODE_REGEX,
//       "Invalid Indian pincode. It must be a 6-digit number."
//     ),
// });

// export const SubscriptionSchema = z.object({
//   email: z
//     .string()
//     .nonempty("Email is required")
//     .email("Invalid email address"),
// });

// export const contactUsSchema = z.object({
//   full_name: z.string().min(1, "Full name is required"),
//   message: z.string().min(1, "Message is required"),
//   phone: z
//     .string()
//     .nonempty("Please enter your phone number.")
//     .regex(phoneRegEx, "Invalid phone number. Please enter a valid number."),
//   email: z
//     .string()
//     .nonempty("Please enter your email.")
//     .regex(emailRegEx, "Invalid email. Please enter a valid email."),
//   pictures:
//     typeof window === "undefined"
//       ? z.any()
//       : z.optional(
//           z
//             .instanceof(FileList)
//             .transform((list) => (list ? Array.from(list) : []))
//             .refine(
//               (files) =>
//                 files.length === 0 ||
//                 files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
//               {
//                 message: "Only .jpg, .jpeg, .png and .webp files are accepted.",
//               }
//             )
//         ),

//   file:
//     typeof window === "undefined"
//       ? z.any()
//       : z.optional(z.instanceof(File)).refine(
//           (file) => {
//             if (!file) return true;
//             if (ACCEPTED_FILE_TYPES.includes(file?.type as string)) {
//               return true;
//             }
//             return false;
//           },
//           {
//             message: `Only PDF files (.pdf) are allowed.`,
//           }
//         ),
// });
