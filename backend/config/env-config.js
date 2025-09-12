import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const config = {
  PORT: process.env.PORT || 6900,
  NODE_ENV: process.env.NODE_ENV || "development",

  DB: process.env.DB || "mongodb://127.0.0.1:27017/sanas-nursery",
  DB_NAME: process.env.DB_NAME || "sanas-nursery",

  JWT_SECRET: process.env.JWT_SECRET || "C964DF8AD8AEA16B253F6D6E4F5FE",
  ACCESS_TOKEN_SECRETS:
    process.env.ACCESS_TOKEN_SECRETS ||
    "$2a$10$isxYoIWIj7oer3214jzblOioRfN.hxJWPutMM6zWLFuAAgXu5Zdme",
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "1d",

  REFRESH_TOKEN_SECRETS:
    process.env.REFRESH_TOKEN_SECRETS ||
    "$2a$10$kBFAg4e5Y3JiYWsUbKiR9OOdxRVMFMRRwEzgm5swD2bJdqLi8l882",
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || "30d",

  BACKEND_PUBLIC_FOLDER: process.env.BACKEND_PUBLIC_FOLDER || "/public",

  ENCRYPTION_SECRET_KEY:
    process.env.ENCRYPTION_SECRET_KEY || "pO202BcuTe90xMCCccOk40gApbLS8Exw",
  RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY || "",

  ALLOWED_ORIGIN:
    process.env.ALLOWED_ORIGIN ||
    "http://localhost:3333, https://sanasnursery.com",
  NEXT_PUBLIC_BACKEND:
    process.env.NEXT_PUBLIC_BACKEND || "https://sanasnursery.com",
  FRONTEND_HOME: process.env.FRONTEND_HOME || "https://sanasnursery.com",

  ZEPTO_API_KEY: process.env.ZEPTO_API_KEY || "",
  ZEPTO_FROM_EMAIL: process.env.ZEPTO_FROM_EMAIL || "noreply@sanasnursery.com",
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || "sanasnursery@gmail.com",
  SUPPORT_EMAIL: process.env.SUPPORT_EMAIL || "info@sanasnursery.com",
  BACKEND_VERIFICATION_ENDPONT: process.env.BACKEND_VERIFICATION_ENDPONT,
  FE_EMAIL_VERIFIED_PAGE: process.env.FE_EMAIL_VERIFIED_PAGE,
  FRONTEND_ADMIN_ENQUIRY: process.env.FRONTEND_ADMIN_ENQUIRY,
  ZEPTO_URL: process.env.ZEPTO_URL,
  CONTACT_NUMBER: process.env.CONTACT_NUMBER,
};

export default config;
