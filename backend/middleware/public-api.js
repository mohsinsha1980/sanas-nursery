import rateLimit from "express-rate-limit";
import config from "../config/env-config.js";

const isHuman = async (req, res, next) => {
  try {
    const { token } = req.body || req.params || req.query;

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
        },
        body: `secret=${config.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    if (!data.success) {
      return next({
        status: 400,
        message: "Captcha verification failed. Not a human.",
      });
    }

    return next();
  } catch (err) {
    return next({
      status: 500,
      message: `${err.message}`,
    });
  }
};

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 5,
  message: {
    error: true,
    message: "Too many requests. Please try again later.",
  },
});

export default isHuman;
