const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const Otp = require("../../models/Otp");
const { readHTMLFile, emailRegex, phoneRegex } = require("../../lib/util.js");
const { validateEmailOTP } = require("../../config/otpConfig.js");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
const mailClient = require("../../config/mailConfig.js");

const updateUserProfile = async (req, res, next) => {
  try {
    const { _id, first_name, last_name, phone, email, password } = req.body;

    if (!_id) {
      return next({ message: "User ID is required.", status: 400 });
    }

    const updateFields = {
      _id,
      first_name,
      last_name,
      phone,
      email,
    };
    let isPassword = false;

    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      updateFields.password = hashed;
      isPassword = true;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next({ message: "User not found", status: 404 });
    }

    updatedUser.password = undefined;

    req.successResponse = {
      message: "User Profile updated successfully!",
      data: { ...formatUserData(updatedUser), isPassword },
    };

    return next();
  } catch (e) {
    return next({
      message:
        e.message || "Internal Server Error while updating user profile.",
      status: 500,
    });
  }
};

const updateUserPassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return next({
        status: 401,
        message: "Old password, new password and confirm password are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return next({
        status: 401,
        message: "Password does not match with confirm password",
      });
    }

    const foundUser = await User.findOne({ _id: req.userData._id });

    if (!foundUser) {
      return next({
        status: 404,
        message: "User not found with this credentials.",
      });
    }

    const compared = await bcrypt.compare(oldPassword, foundUser.password);
    if (!compared) {
      return next({ status: 400, message: "Old password is incorrect" });
    }

    const hashed = await bcrypt.hash(newPassword.trim(), 10);
    const user = await User.findOneAndUpdate(
      { phone: foundUser.phone },
      {
        password: hashed,
      }
    );

    if (!user) {
      return next({ status: 401, message: "User not found" });
    }

    req.successResponse = {
      data: "",
      message: "Password reset successful!",
    };

    return next();
  } catch (e) {
    return next({
      message:
        e.message || "Internal Server Error while updating user password.",
      status: 500,
    });
  }
};

const addAddress = async (req, res, next) => {
  try {
    const {
      _id,
      fullName,
      phone,
      address1,
      address2,
      city,
      isPrimary,
      state,
      zip,
    } = req.body;
    if (
      !_id ||
      !fullName ||
      !phone ||
      !address1 ||
      !city ||
      isPrimary === undefined ||
      !state ||
      !zip
    ) {
      return next({
        message: "Missing required fields",
        status: 400,
      });
    }

    const user = await User.findById(_id);

    if (!user) {
      return next({ message: "User not found", status: 404 });
    }

    if (user.addresses && !user.addresses.length) {
      user.addresses.push({
        fullName,
        phone,
        address1,
        address2,
        city,
        state,
        zip,
        isPrimary: true,
      });
    } else {
      if (isPrimary) {
        user.addresses.forEach((item) => {
          item.isPrimary = false;
        });
        user.addresses.push({
          fullName,
          phone,
          address1,
          address2,
          city,
          state,
          zip,
          isPrimary,
        });
      } else {
        user.addresses.push({
          fullName,
          phone,
          address1,
          address2,
          city,
          state,
          zip,
          isPrimary,
        });
      }
    }

    const updatedUser = await user.save();

    req.successResponse = {
      message: "Address added successfully!",
      data: updatedUser,
    };

    return next();
  } catch (e) {
    return next({
      message: "Internal Server Error while adding address.",
      status: 500,
    });
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const { addressId, userId } = req.body;
    if (!addressId) {
      return next({
        message: `Address not found.`,
        status: 404,
      });
    }
    if (!userId) {
      return next({
        message: `User not found.`,
        status: 404,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return next({
        message: `User does not exist`,
        status: 404,
      });
    }
    const isPrimary = user.addresses.some(
      (item) => item._id.toString() === addressId && item.isPrimary
    );
    if (isPrimary) {
      return next({
        message: `Primary Address cannot be deleted`,
        status: 400,
      });
    }

    const updatedAddresses = user.addresses.filter(
      (item) => item._id.toString() !== addressId
    );
    user.addresses = updatedAddresses;

    await user.save();
    req.successResponse = {
      message: "Address deleted successfully.",
    };

    return next();
  } catch (e) {
    return next({
      message: error.message || "An error occurred while deleting the address.",
      status: 500,
    });
  }
};

const getEmailOtp = async (req, res, next) => {
  try {
    const { identifier } = req.body;

    let query = {};
    if (emailRegex.test(identifier)) {
      query.email = identifier;
    } else {
      return next({ status: 400, message: "Invalid identifier format" });
    }

    const foundUser = await User.findOne({ _id: req.userData._id });

    const expiryMinutes = 10;
    const data = {
      phone: foundUser.phone,
      email: identifier,
      otp: Math.floor(100000 + Math.random() * 900000),
      expireIn: new Date().getTime() + expiryMinutes * 60 * 1000, // 10 min
    };

    const existingOtp = await Otp.find({ phone: foundUser.phone });

    if (existingOtp.length) {
      await Otp.deleteMany({ phone: foundUser.phone });
    }

    const otp = await Otp.create(data);

    readHTMLFile(
      path.join(__dirname + "/../../templates/emailVerification.html"),
      async function (readFileErr, html) {
        if (readFileErr) {
          return next({
            status: 500,
            message: "Error reading email template",
          });
        }
        const template = handlebars.compile(html);
        const replacements = {
          name: foundUser.first_name || "user",
          email: identifier,
          otp: otp.otp,
          supportEmail: process.env.SUPPORT_EMAIL,
          expiryMinutes,
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
                  address: identifier,
                  name: "Info",
                },
              },
            ],
            subject: "TrendyThreads: Email Verification",
            htmlbody: htmlToSend,
          });

          req.successResponse = {
            message: "Otp send on email successfully!",
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

const validateEmailOtp = async (req, res, next) => {
  try {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
      return next({
        message: "Identifier, and otp are required",
        status: 401,
      });
    }

    let query = {};
    if (emailRegex.test(identifier)) {
      query.email = identifier;
    }

    const foundUser = await User.findOne({ _id: req.userData._id });

    if (!foundUser) {
      return next({
        status: 404,
        message: "User not found with this credentials.",
      });
    }

    const isValid = await validateEmailOTP(
      foundUser.phone,
      identifier,
      otp.toString()
    );

    if (isValid.error) {
      return next({ status: 400, message: isValid.message });
    }

    let updatedUser = null;
    if (isValid) {
      foundUser.email = identifier;
      updatedUser = await foundUser.save();
    }
    await Otp.deleteMany({ phone: foundUser.phone });

    req.successResponse = {
      data: formatUserData(updatedUser),
      message: "Email verified successful!",
    };
    return next();
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

module.exports = {
  updateUserProfile,
  addAddress,
  deleteAddress,
  getEmailOtp,
  validateEmailOtp,
  updateUserPassword,
};

const formatUserData = (user) => ({
  _id: user._id,
  email: user.email,
  role: user.role,
  first_name: user.first_name,
  last_name: user.last_name,
  addresses: user.addresses,
  photo: user.photo,
  phone: user.phone,
  wishlist: user.wishlist,
  isPassword: user.password ? true : false,
});
