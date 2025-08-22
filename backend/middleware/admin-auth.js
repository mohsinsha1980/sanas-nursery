import { verify } from "jsonwebtoken";
import { ROLES } from "../lib/constants";
import { clearAuthCookies } from "./user-auth";

const adminAuth = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      if (refreshToken) clearAuthCookies(res);
      return next({
        status: 401,
        message: "Unauthorized : Please login!",
      });
    }

    let verifiedUser;

    verifiedUser = verify(accessToken, process.env.ACCESS_TOKEN_SECRETS);
    if (
      !verifiedUser?._id ||
      !verifiedUser.role ||
      verifiedUser.role !== ROLES.ADMIN
    ) {
      return next({
        status: 401,
        message: "You are not authorized for this operation.",
      });
    }
    req.userData = verifiedUser;
    return next();
  } catch (err) {
    // if access token not expired and tampered it makes user logout
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

export default adminAuth;
