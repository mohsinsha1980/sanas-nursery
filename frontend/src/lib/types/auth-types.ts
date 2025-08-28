import z from "zod";
import {
  forgetPassSchema,
  resetPassSchema,
  signInSchema,
  signUpSchema,
} from "../schemas/auth";

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>;
export type ForgetPassField = z.infer<typeof forgetPassSchema>;
export type ResetPassType = z.infer<typeof resetPassSchema>;
