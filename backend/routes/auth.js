const express = require("express");
const routes = express.Router();
const userCtrl = require("../controllers/auth-controller");
const userAuthMiddlewares = require("../middleware/user-auth");
const { isHuman } = require("../middleware/recaptcha");
const publicAuth = require("../middleware/public-auth");

routes.post(
  "/getAuthOtp",
  userAuthMiddlewares.otpRateLimiter,
  isHuman,
  userCtrl.getAuthOtp
);
routes.post(
  "/validateOtp",
  userAuthMiddlewares.otpRateLimiter,
  isHuman,
  userCtrl.validateOtp
);
routes.post("/signin", isHuman, userCtrl.signin);
routes.get("/verify/:token", isHuman, userCtrl.verify);
routes.post("/forgotPassword", isHuman, userCtrl.forgotPassword);
routes.post("/resetPassword", isHuman, userCtrl.resetPassword);

routes.post("/logout", publicAuth, userCtrl.logout);

module.exports = routes;
