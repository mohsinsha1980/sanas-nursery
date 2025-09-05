import bcrypt from "bcryptjs";
import { PASSWORD_HASH_ROUND } from "../../lib/constants.js";
import { phoneRegEx } from "../../lib/util.js";
import User from "../../models/User.js";
import { OrderEnquiry } from "../../models/OrderEnquiry.js";
import Wishlist from "../../models/Wishlist.js";

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.userData?._id;
    if (!userId) {
      return next({
        message: "Unauthorized: User not found.",
        status: 401,
      });
    }

    const { name, phone } = req.body;
    if (!name) {
      return next({
        message: "Name is required.",
        status: 400,
      });
    }

    if (phone && !phoneRegEx.test(phone)) {
      return next({ status: 400, message: "Invalid phone format" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, phone },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return next({
        message: "User not found.",
        status: 404,
      });
    }

    req.successResponse = {
      message: "Profile updated successfully.",
      data: "",
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while updating profile.",
      status: 500,
    });
  }
};

export const updateUserPassword = async (req, res, next) => {
  try {
    const userId = req.userData?._id;
    if (!userId) {
      return next({
        message: "Unauthorized: User not found.",
        status: 401,
      });
    }

    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return next({
        message: "Current password and new password are required.",
        status: 400,
      });
    }

    if (newPassword !== confirmPassword) {
      return next({
        message: "New password and confirm password do not match.",
        status: 400,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return next({
        message: "User not found.",
        status: 404,
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return next({
        message: "Current password is incorrect.",
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, PASSWORD_HASH_ROUND);
    user.password = hashedPassword;
    await user.save();

    req.successResponse = {
      message: "Password updated successfully.",
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while updating password.",
      status: 500,
    });
  }
};

export const getEnquiries = async (req, res, next) => {
  try {
    const userId = req.userData?._id;
    if (!userId) {
      return next({
        message: "User ID is required.",
        status: 400,
      });
    }

    const enquiries = await OrderEnquiry.find({ userId })
      .populate("plantId", "title")
      .sort({ createdAt: -1 })
      .lean();

    const formattedEnquiries = enquiries?.length
      ? enquiries.map((enquiry) => ({
          _id: enquiry._id.toString(),
          plantId: {
            _id: enquiry.plantId?._id?.toString() || "",
            title: enquiry.plantId?.title || "",
          },
          message: enquiry.message,
          status: enquiry.status,
          createdAt: enquiry.createdAt,
          updatedAt: enquiry.updatedAt,
        }))
      : [];

    req.successResponse = {
      message: "Enquiries retrieved successfully.",
      data: formattedEnquiries,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching enquiries.",
      status: 500,
    });
  }
};

export const getUserWishlist = async (req, res, next) => {
  try {
    const userId = req.userData?._id;
    if (!userId) {
      return next({
        status: 400,
        message: "User ID is required",
      });
    }

    const wishlist = await Wishlist.find({ userId })
      .populate("plantId", "_id title slug picture")
      .lean();

    const formattedWishlist = wishlist.map((item) => ({
      _id: item._id.toString(),
      title: item.plantId?.title || "",
      slug: item.plantId?.slug || "",
      picture: item.plantId?.pictures[0] || "",
    }));

    req.successResponse = {
      message: "Wishlist fetched successfully",
      data: formattedWishlist,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "Failed to fetch wishlist",
      status: 500,
    });
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const { plantId } = req.params;
    const userId = req.userData?._id;

    if (!userId || !plantId) {
      return next({ status: 401, message: "Unauthorized" });
    }

    const deletedItem = await Wishlist.findOneAndDelete({
      plantId,
      userId: userId,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Wishlist item not found or not owned by user",
      });
    }

    req.successResponse = {
      message: "Item removed from wishlist successfully",
      data: "",
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error?.message || "Server error while removing wishlist item",
    });
  }
};
