import { z } from "zod";
import { emailRegEx, phoneRegEx, nameRegEx } from "../helper";

export const nameSchema = z
  .string()
  .nonempty("Name is required")
  .refine((value) => nameRegEx.test(value), {
    message: "Name should contain only alphabets and spaces",
  });

export const phoneSchema = z
  .string()
  .nonempty("Please enter your 10 digit phone number.")
  .regex(phoneRegEx, "Invalid phone number. Please enter a valid 10 digit number. (9876543210) ");

export const emailSchema = z
  .string()
  .nonempty("Email is required")
  .refine((value) => emailRegEx.test(value), {
    message: "Email must be a valid.",
  });

export const passwordSchema = z
  .string()
  .nonempty("Password is required")
  .min(8, "Password should be 8 or more characters long");

export const confirmPasswordSchema = z
  .string()
  .nonempty("Confirm Password is required")
  .min(8, "Confirm Password should be 8 or more characters long");

export const otpSchema = z.string().length(6, "OTP must be 6 digits");

export const signUpSchema = z
  .object({
    name: nameSchema,
    phone: phoneSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const forgetPassSchema = z.object({
  email: emailSchema,
});

export const resetPassSchema = z
  .object({
    email: emailSchema,
    otp: otpSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
