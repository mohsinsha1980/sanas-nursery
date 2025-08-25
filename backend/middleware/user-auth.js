import jwt from "jsonwebtoken";
import { ROLES } from "../lib/constants.js";
const { verify } = jwt;

export const userAuth = async (req, res, next) => {
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
      verifiedUser.role !== ROLES.USER
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

export const clearAuthCookies = (res) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  res.clearCookie("accessToken", options);
  res.clearCookie("refreshToken", options);
};

export const setAuthCookies = (res, accessToken, refreshToken) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // maxAge: 15 * 60 * 1000, // 15 minutes
  };
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);
};
