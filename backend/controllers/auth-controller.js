import bcrypt from "bcryptjs";
import { PASSWORD_HASH_ROUND, ROLES } from "../lib/constants.js";
import { emailRegEx, formatUserData, phoneRegEx } from "../lib/util.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import config from "../config/env-config.js";
import sendEmail from "../services/sendEmail.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Otp from "../models/Otp.js";
import log from "../services/logger.js";
import { clearAuthCookies, setAuthCookies } from "../middleware/user-auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const signup = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return next({
        status: 400,
        message: "Name, email and password are required",
      });
    }

    if (!emailRegEx.test(email)) {
      return next({ status: 400, message: "Invalid email format" });
    }

    if (phone && !phoneRegEx.test(phone)) {
      return next({ status: 400, message: "Invalid phone format" });
    }

    const existingUser = await User.findOne({ email });

    let user;
    if (!existingUser) {
      const hashed = await bcrypt.hash(password, PASSWORD_HASH_ROUND);
      const newUser = new User({
        name,
        email: email,
        phone: phone || undefined,
        password: hashed,
        role: ROLES.USER,
        googleId: null,
      });
      user = await User.create(newUser);
    } else if (existingUser && !existingUser.is_verified) {
      user = existingUser;
    }

    const verifyToken = jwt.sign(
      {
        email: email,
      },
      config.JWT_SECRET,
      { expiresIn: config.ACCESS_TOKEN_EXPIRY }
    );

    const replacements = {
      supportEmail: config.SUPPORT_EMAIL,
      verificationLink: `${config.BACKEND_VERIFICATION_ENDPONT}/${verifyToken}`,
    };

    const { error, message } = await sendEmail({
      templatePath: path.join(
        __dirname + "../../templates/emailVerification.html"
      ),
      receiverEmail: user.email,
      subject: "Sanas Nursery: Email Verification",
      replacements,
    });

    if (error) {
      return next({
        status: 500,
        message: message,
      });
    } else {
      req.successResponse = {
        message: "Verification link sent in email successfully",
      };
      next();
    }
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, config.JWT_SECRET);
    if (!decoded?.email) {
      return next({
        status: 400,
        message: "Invalid or corrupted token. Email information is missing.",
      });
    }

    const filter = { email: decoded.email };
    const update = { isVerified: true };
    await User.findOneAndUpdate(filter, update);
    return res.redirect(config.FE_EMAIL_VERIFIED_PAGE);
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

export const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next({
        status: 400,
        message: "Email and password are required",
      });
    }

    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return next({
        status: 404,
        message: "User not found with this email.",
      });
    }

    if (!foundUser.isVerified) {
      return next({
        status: 400,
        message: "User is not verified, Please register again.",
      });
    }

    if (!foundUser.password) {
      return next({
        status: 400,
        message: "Use the same method you registered with to log in.",
      });
    }

    const compared = await bcrypt.compare(password, foundUser.password);
    if (!compared) {
      return next({ status: 400, message: "Incorrect password" });
    }

    const accessToken = foundUser.generateAccessToken();
    const refreshToken = foundUser.generateRefreshToken();

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    setAuthCookies(res, accessToken, refreshToken);

    const formattedUser = formatUserData(foundUser.toObject());

    req.successResponse = {
      message: "Sign-in successful.",
      data: formattedUser,
    };
    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message,
    });
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next({
        status: 400,
        message: "Email is required!",
      });
    }

    const foundUser = await User.findOne({ email, isVerified: true });
    if (!foundUser) {
      return next({
        status: 404,
        message: "User is either not registered or not verified",
      });
    }

    await Otp.findOneAndDelete({ email });
    const data = {
      email,
      otp: Math.floor(100000 + Math.random() * 900000),
      expireIn: new Date().getTime() + 1000 * 30 * 60, //  30 mins
    };

    const otp = await Otp.create(data);

    const replacements = {
      name: foundUser.name,
      email: foundUser.email,
      otp: otp.otp,
      supportEmail: config.SUPPORT_EMAIL,
    };

    const { error, message } = await sendEmail({
      templatePath: path.join(__dirname + "./../templates/forgotPassword.html"),
      receiverEmail: email,
      subject: "Sanas Nursery: Otp for reset password",
      replacements,
    });

    if (error) {
      return next({
        status: 500,
        message: message,
      });
    } else {
      req.successResponse = {
        message: "Otp sent in email successfully",
      };
      next();
    }
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;
    if (!email || !otp || !password || !confirmPassword) {
      return next({
        status: 401,
        message: "Email, otp , password and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return next({
        status: 404,
        message:
          "No forgot password request found for this email. Please initiate a new request.",
      });
    }

    const savedOtp = await Otp.findOne({ email, otp });

    if (!savedOtp) {
      return next({
        status: 404,
        message:
          "No forgot password request found for this email. Please initiate a new request.",
      });
    }

    if (savedOtp?.otp !== +otp) {
      return next({ status: 401, message: "OTP is incorrect" });
    }

    const currentTime = new Date().getTime();
    const expiry = new Date(savedOtp.expireIn).getTime();
    const diff = expiry - currentTime;

    if (diff < 0) {
      return next({
        status: 400,
        message: "OTP is expired.",
      });
    }

    const hashed = await bcrypt.hash(password ? password.trim() : password, 10);
    const user = await User.findOneAndUpdate(
      { email },
      {
        password: hashed,
      }
    );
    if (!user) {
      return next({ status: 401, message: "User not found" });
    }

    await Otp.findOneAndDelete({ otp: otp, email: email });

    req.successResponse = {
      message: "Password reset successful!",
    };
    next();
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return next({ status: 400, message: "No refresh token provided" });
    }

    const foundUser = await User.findById(req.userData?._id);
    if (!foundUser) {
      return next({
        status: 404,
        message: "User not found",
      });
    }

    if (foundUser.refreshToken !== refreshToken) {
      log({
        level: "error",
        user: req?.userData?._id || "Unknown User",
        url: req?.method + ": " + req?.originalUrl,
        message:
          "***Logout: Invalid refresh token. Please try clearing your browser cookies. ***",
      });
    }

    foundUser.refreshToken = null;
    await foundUser.save();

    res.clearCookie("accessToken", { httpOnly: true, secure: true });
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });

    req.successResponse = { message: "Logout successful" };
    return next();
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

export const getLogedInUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      _id: req.userData._id,
    });

    if (!foundUser) {
      return next({ status: 404, message: "User not found" });
    }

    if (!foundUser.isVerified) {
      return next({
        status: 404,
        message: "User is not verified",
      });
    }

    const formattedUser = formatUserData(foundUser.toObject());

    req.successResponse = {
      message: "User retrieved successfully.",
      data: formattedUser,
    };
    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message,
    });
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return next({
        status: 401,
        message: "Unauthorized: No refresh token provided",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETS);
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      clearAuthCookies(res);
      return next({
        status: 403,
        message: "RefreshTokenExpiredError",
      });
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save();
    setAuthCookies(res, newAccessToken, newRefreshToken);
    req.userData = user;

    req.successResponse = {
      message: "Access token refreshed successfully.",
      data: "",
    };

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      clearAuthCookies(res);
      return next({
        status: 403,
        message: "RefreshTokenExpiredError",
      });
    } else {
      return next({
        status: 500,
        message: `*** ${error.message} , Please login again! ***`,
      });
    }
  }
};
