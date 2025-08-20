const { ROLES, STATUS } = require("../lib/constants.js");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const handlebars = require("handlebars");
const User = require("../models/User.js");
const Otp = require("../models/Otp.js");
const {
  readHTMLFile,
  emailRegex,
  phoneRegex,
  formatUserData,
} = require("../lib/util.js");
const { sendOTP, validateOTP } = require("../config/otpConfig.js");
const path = require("path");
const { log } = require("../services/logger");
const mailClient = require("../config/mailConfig.js");

const getAuthOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return next({
        status: 400,
        message: "Required fields is missing . Phone Number is required",
      });
    }

    const otpSent = await sendOTP(phone);
    if (otpSent?.error) {
      return next({ status: 500, message: otpSent.message });
    }

    let foundUser = await User.findOne({ phone });

    if (foundUser && !foundUser.active) {
      return next({
        status: 400,
        message: "User is not active, Please contact support.",
      });
    }

    req.successResponse = {
      message: "OTP sent for verification.",
      data: "",
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

const validateOtp = async (req, res, next) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return next({
        status: 400,
        message: "Required fields are missing. Phone and Otp is required!",
      });
    }

    const isValid = await validateOTP(phone, otp);
    if (isValid.error) {
      return next({ status: 400, message: isValid.message });
    }

    let foundUser = await User.findOne({ phone }).populate("wishlist");
    let user = foundUser;

    if (!foundUser) {
      user = await User.create({
        phone,
        role: ROLES.USER,
        is_verified: true,
      });
    }

    const activeWishlist =
      user.wishlist
        ?.filter((product) => product.status === STATUS.ACTIVE)
        .map((product) => product._id) || [];

    if (foundUser?.wishlist) {
      const deletedProductIds = foundUser.wishlist
        ?.filter((product) => product.status === STATUS.DELETED)
        .map((product) => product._id);

      if (deletedProductIds?.length) {
        user.wishlist = foundUser.wishlist
          .filter((product) => product.status !== STATUS.DELETED)
          .map((product) => product._id);
      }
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    const newUser = await user.save();
    setAuthCookies(res, accessToken, refreshToken);

    const formattedUser = formatUserData({
      ...newUser.toObject(),
      wishlist: activeWishlist,
    });

    req.successResponse = {
      message: foundUser ? "Sign-in successful." : "Sign-up successful.",
      data: formattedUser,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

const verify = async (req, res) => {
  const { token } = req.params;

  jwt.verify(token, process.env.SECRET, async function (err, decoded) {
    if (err) {
      const message =
        "Email verification failed, possibly the link is invalid or expired";

      return next({
        status: 400,
        message,
      });
    } else {
      const filter = { email: decoded.data };
      const update = { is_verified: true };
      await User.findOneAndUpdate(filter, update);

      return res.redirect(process.env.FRONTEND_VERIFIED_PAGE);
    }
  });
};

const signin = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return next({
        status: 400,
        message: "Identifier and password are required",
      });
    }

    let query = {};
    if (emailRegex.test(identifier)) {
      query.email = identifier;
    } else if (phoneRegex.test(identifier)) {
      query.phone = identifier;
    } else {
      return next({ status: 400, message: "Invalid identifier format" });
    }

    const foundUser = await User.findOne(query).populate("wishlist");
    if (!foundUser) {
      return next({
        status: 404,
        message: "User not found with this credentials.",
      });
    }

    if (!foundUser.is_verified || !foundUser.active) {
      return next({
        status: 400,
        message: "User is not active or not verified, Please contact support.",
      });
    }

    if (!foundUser.password) {
      return next({ status: 400, message: "Invalid Password!" });
    }

    const compared = await bcrypt.compare(password, foundUser.password);
    if (!compared) {
      return next({ status: 400, message: "Incorrect password" });
    }

    const activeWishlist = foundUser.wishlist
      .filter((product) => product.status === STATUS.ACTIVE)
      .map((product) => product._id);

    const deletedProductIds = foundUser.wishlist
      .filter((product) => product.status === STATUS.DELETED)
      .map((product) => product._id);

    if (deletedProductIds?.length) {
      foundUser.wishlist = foundUser.wishlist
        .filter((product) => product.status !== STATUS.DELETED)
        .map((product) => product._id);
    }

    const accessToken = foundUser.generateAccessToken();
    const refreshToken = foundUser.generateRefreshToken();

    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    setAuthCookies(res, accessToken, refreshToken);

    const formattedUser = formatUserData({
      ...foundUser.toObject(),
      wishlist: activeWishlist,
    });

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

const forgotPassword = async (req, res, next) => {
  try {
    const { identifier } = req.body;

    let query = {};
    if (emailRegex.test(identifier)) {
      query.email = identifier;
    } else if (phoneRegex.test(identifier)) {
      isEmail = false;
      query.phone = identifier;
    } else {
      return next({ status: 400, message: "Invalid identifier format" });
    }

    const foundUser = await User.findOne(query);
    if (!foundUser) {
      return next({
        status: 404,
        message: "User not found with this credentials.",
      });
    }

    if (!foundUser.is_verified || !foundUser.active) {
      return next({
        status: 400,
        message: "User is not verified or active, Please contact support.",
      });
    }

    if (!foundUser.email) {
      return next({
        status: 400,
        message: "No email address found with your account.",
      });
    }

    await Otp.deleteMany({ phone: foundUser.phone });
    const data = {
      phone: foundUser.phone,
      otp: Math.floor(100000 + Math.random() * 900000),
      expireIn: new Date().getTime() + 1800 * 1000,
    };
    const otp = await Otp.create(data);

    readHTMLFile(
      path.join(__dirname + "/../templates/forgotPassword.html"),
      async function (readFileErr, html) {
        if (readFileErr) {
          return next({
            status: 500,
            message: "Error reading email template",
          });
        }
        const template = handlebars.compile(html);
        const replacements = {
          name:
            `${foundUser.first_name || ""} ${
              foundUser.last_name || ""
            }`.trim() || foundUser.email,
          email: foundUser.email,
          otp: otp.otp,
          supportEmail: process.env.SUPPORT_EMAIL,
        };
        const htmlToSend = template(replacements);

        try {
          await mailClient.sendMail({
            from: {
              address: process.env.EMAIL_FROM,
              name: "TrendyThreads",
            },
            to: [
              {
                email_address: {
                  address: foundUser.email,
                  name: "Info",
                },
              },
            ],
            subject: "TrendyThreads: Reset password",
            htmlbody: htmlToSend,
          });

          req.successResponse = {
            message: "OTP sent to your email successfully!",
          };
          return next();
        } catch (err) {
          return next({ status: 500, message: err.message });
        }
      }
    );
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { identifier, otp, password, confirmPassword } = req.body;
    if (!identifier || !otp || !password || !confirmPassword) {
      return next({
        status: 401,
        message: "Identifier, otp, password and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return next({
        status: 401,
        message: "Password does not match with confirm password",
      });
    }

    let query = {};
    if (emailRegex.test(identifier)) {
      query.email = identifier;
    } else if (phoneRegex.test(identifier)) {
      query.phone = identifier;
    } else {
      return next({ status: 400, message: "Invalid identifier format" });
    }

    const foundUser = await User.findOne(query);
    if (!foundUser) {
      return next({
        status: 404,
        message: "User not found with this credentials.",
      });
    }

    if (!foundUser.is_verified || !foundUser.active) {
      return next({
        status: 400,
        message: "User is not active or not verified",
      });
    }

    const isValid = await validateOTP(foundUser.phone, otp);
    if (isValid.error) {
      return next({ status: 400, message: isValid.message });
    }

    const hashed = await bcrypt.hash(password.trim(), 10);
    const user = await User.findOneAndUpdate(
      { phone: foundUser.phone },
      {
        password: hashed,
      }
    );

    if (!user) {
      return next({ status: 401, message: "User not found" });
    }
    await Otp.deleteMany({ phone: foundUser.phone });

    req.successResponse = {
      data: "",
      message: "Password reset successful!",
    };
    return next();
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return next({
        status: 400,
        message: "Old and new passwords are required",
      });
    }

    const { _id } = req.userData;

    if (!_id) {
      return next({
        status: 400,
        message: "You are not authorized to perform this action",
      });
    }

    const foundUser = await User.findOne({ _id });

    const compared = await bcrypt.compare(oldPassword, foundUser.password);

    if (!compared) {
      return next({ status: 400, message: "Old password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ _id }, { password: hashed });

    req.successResponse = {
      message: "Password updated successfully.",
      data: "",
    };
    return next();
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

const logout = async (req, res, next) => {
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

module.exports = {
  verify,
  signin,
  updatePassword,
  forgotPassword,
  resetPassword,
  getAuthOtp,
  validateOtp,
  logout,
};

const setAuthCookies = (res, accessToken, refreshToken) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    // sameSite: "None",
  };
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);
};
