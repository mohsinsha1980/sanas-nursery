// import { z } from "zod";
// import {
//   AuthOtpSchema,
//   forgetPassSchema,
//   phoneValSchema,
//   resetPassSchema,
//   signInSchema,
// } from "../schemas/auth";

// export type AuthFields = z.infer<typeof phoneValSchema>;
// export type AuthOtpFields = z.infer<typeof AuthOtpSchema>;
// export type SignInUser = z.infer<typeof signInSchema>;
// export type ForgetPassField = z.infer<typeof forgetPassSchema>;
// export type ResetPassField = z.infer<typeof resetPassSchema>;

// export type SignInUserApiType = SignInUser & {
//   token: string;
// };

// export type ValidateOtpApiType = AuthOtpFields & {
//   token: string;
// };

// export type GetAuthOtpApiType = AuthFields & {
//   token: string;
//   phone?: string;
// };

// export type ResetPasswordApiType = ResetPassField & {
//   token: string;
// };

// export type ForgetPassApiType = ForgetPassField & {
//   token: string;
// };
