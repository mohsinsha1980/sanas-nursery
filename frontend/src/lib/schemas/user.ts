// import { z } from "zod";
// import { emailRegEx, phoneRegEx, zipRegEx } from "../helper";

// export const editProfileSchema = z.object({
//   _id: z.string(),
//   first_name: z
//     .string()
//     .max(50, { message: "First name must be less than 50 characters" })
//     .optional()
//     .default(""),
//   last_name: z
//     .string()
//     .max(50, { message: "Last name must be less than 50 characters" })
//     .optional()
//     .default(""),
// });

// export const editProfileEmail = z.object({
//   email: z
//     .string()
//     .nonempty({ message: "Email is required." })
//     .regex(emailRegEx, { message: "Invalid email address" }),
//   otp: z.string().min(6, {
//     message: "Your one-time password must be 6 characters.",
//   }),
// });

// export const editProfilePassword = z.object({
//   password: z.string(),
// });

// export const updateProfilePassword = z
//   .object({
//     oldPassword: z
//       .string()
//       .nonempty("Old password is required")
//       .min(8, "Password should be 8 or more characters long"),
//     confirmPassword: z
//       .string()
//       .nonempty("Confirm password is required")
//       .min(8, "Confirm password should be 8 or more characters long"),
//     newPassword: z
//       .string()
//       .nonempty("New password is required")
//       .min(8, "New password should be 8 or more characters long"),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Confirm password must match new password",
//     path: ["confirmPassword"],
//   })
//   .refine((data) => data.oldPassword !== data.newPassword, {
//     message: "New password cannot be the same as the old password",
//     path: ["newPassword"],
//   });

// export const addressSchema = z.object({
//   _id: z.string().nonempty("User id is required"),
//   fullName: z
//     .string()
//     .min(1, "First name is required")
//     .max(50, { message: "First name must be less than 50 characters" }),
//   phone: z.string().regex(phoneRegEx, { message: "Invalid phone number" }),
//   address1: z.string().min(1, "Address Line 1 is required"),
//   address2: z.string().optional(),
//   city: z.string().min(1, "City is required"),
//   state: z.string().min(1, "State is required"),
//   zip: z
//     .string()
//     .min(1, "ZIP Code is required")
//     .regex(zipRegEx, "Invalid ZIP Code"),
//   isPrimary: z.boolean(),
// });

// export const supportschema = z.object({
//   issue: z.string().nonempty("Issue is required"),
//   orderId: z.string().nonempty("Order ID is required"),
//   tnxID: z.string().optional(),
//   description: z.string().min(1, "Description is required"),
//   phone: z
//     .string()
//     .nonempty("Please enter your phone number.")
//     .regex(phoneRegEx, "Invalid phone number. Please enter a valid number."),
//   email: z
//     .string()
//     .nonempty("Please enter your email ID.")
//     .regex(emailRegEx, "Invalid email. Please enter a valid email."),
// });
