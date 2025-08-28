import jwt from "jsonwebtoken";
import { clearAuthCookies } from "./user-auth.js";
const { verify } = jwt;

const isAuthenticated = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      if (refreshToken) clearAuthCookies(res);
      return next({
        status: 401,
        message: "Please login!",
      });
    }

    let verifiedUser;
    verifiedUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRETS);
    if (!verifiedUser?._id || !verifiedUser.role) {
      clearAuthCookies(res);
      return next({
        status: 401,
        message: "*** Verification falied. Please login! ***",
      });
    }
    req.userData = verifiedUser;
    return next();
  } catch (err) {
    if (err.name !== "TokenExpiredError") {
      clearAuthCookies(res);
    } else if (err.name === "TokenExpiredError") {
      return next({
        status: 403,
        message: `AccessTokenExpiredError`,
      });
    }
    return next({
      status: 401,
      message: "**Invalid access token, Please login again!**",
    });
  }
};
export default isAuthenticated;
