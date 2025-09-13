import { Router } from "express";
import * as authCtrl from "../controllers/auth-controller.js";
import isAuthenticated from "../middleware/authentication.js";
import isHuman, { rateLimiter } from "../middleware/public-api.js";

const routes = Router();

routes.post("/signup", rateLimiter, isHuman, authCtrl.signup);
routes.get("/verify-email/:token", rateLimiter, authCtrl.verifyEmail);
routes.post("/signin", rateLimiter, isHuman, authCtrl.signin);
routes.post("/forgot-password", rateLimiter, isHuman, authCtrl.forgotPassword);
routes.post("/reset-password", rateLimiter, isHuman, authCtrl.resetPassword);
routes.post("/logout", rateLimiter, isAuthenticated, authCtrl.logout);
routes.get("/refresh-token", authCtrl.refreshToken);
routes.get(
  "/login-user",
  rateLimiter,
  isAuthenticated,
  authCtrl.getLogedInUser
);

export default routes;
