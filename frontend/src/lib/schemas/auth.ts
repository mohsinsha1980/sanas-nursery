import { z } from "zod";
import { phoneRegEx } from "../helper";

export const phoneValSchema = z.object({
  phone: z
    .string()
    .nonempty("Please enter your phone number.")
    .regex(phoneRegEx, "Invalid phone number. Please enter a valid number."),
});

// export const AuthOtpSchema = z.object({
//   phone: z.string(), // no need to validate phone as it is coming in query . keep here beacause requires type of obj to send in api
//   otp: z.string().length(6, "OTP must be 6 digits"),
// });

// export const signInSchema = z.object({
//   identifier: z
//     .string()
//     .nonempty("Identifier is required")
//     .refine((value) => emailRegEx.test(value) || phoneRegEx.test(value), {
//       message: "Identifier must be a valid email address or mobile number",
//     }),
//   password: z
//     .string()
//     .nonempty("Password is required")
//     .min(8, "Password should be 8 or more characters long"),
// });

// export const forgetPassSchema = z.object({
//   identifier: z
//     .string()
//     .nonempty("Identifier is required")
//     .refine((value) => emailRegEx.test(value) || phoneRegEx.test(value), {
//       message: "Identifier must be a valid email address or mobile number",
//     }),
// });

// export const resetPassSchema = z
//   .object({
//     identifier: z
//       .string()
//       .nonempty("Identifier is required")
//       .refine((value) => emailRegEx.test(value) || phoneRegEx.test(value), {
//         message: "Identifier must be a valid email address or mobile number",
//       }),
//     otp: z.string().length(6, "OTP must be 6 digits"),
//     password: z
//       .string()
//       .nonempty("Password is required")
//       .min(8, "Password should be 8 or more characters long"),
//     confirmPassword: z
//       .string()
//       .nonempty("Confirm Password is required")
//       .min(8, "Confirm Password should be 8 or more characters long"),
//   })
//   .superRefine((data, ctx) => {
//     if (data.password !== data.confirmPassword) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         path: ["confirmPassword"],
//         fatal: true,
//         message: "Confirm Password does not match with password",
//       });
//     }
//   });
