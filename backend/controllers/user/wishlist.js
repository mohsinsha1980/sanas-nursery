const { default: mongoose } = require("mongoose");
const User = require("../../models/User");
const { STATUS } = require("../../lib/constants");

const removeProductFromWishList = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const userId = req.userData._id;

    if (!userId || !productId) {
      return next({
        status: 401,
        message: "User id and product id are required.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return next({ status: 404, message: "User not found." });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);
    if (!user.wishlist.includes(productObjectId)) {
      return next({
        status: 404,
        message: "Product not found in the wishlist.",
      });
    }
    user.wishlist = user.wishlist.filter(
      (item) => !item.equals(productObjectId)
    );
    const userData = await user.save();

    req.successResponse = {
      message: "Product removed from wishlist successfully.",
      data: userData.wishlist,
    };

    return next();
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

const addProductToWishList = async (req, res, next) => {
  try {
    const { productId } = req.body;
    const userId = req.userData._id;

    if (!userId || !productId) {
      return next({
        status: 400,
        message: "User ID and product ID are required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return next({ status: 404, message: "User not found." });
    }

    if (user.wishlist.includes(productId)) {
      return next({
        status: 400,
        message: "Product is already in the wishlist.",
      });
    }

    user.wishlist.push(productId);
    const userData = await user.save();

    req.successResponse = {
      message: "Product added to wishlist successfully.",
      data: userData.wishlist,
    };

    return next();
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
};

const getWishlistProducts = async (req, res, next) => {
  try {
    const userId = req.userData._id;

    if (!userId) {
      return next({
        status: 400,
        message: "User ID is required",
      });
    }

    const user = await User.findById(userId).populate({
      path: "wishlist",
      match: { status: { $ne: STATUS.DELETED } },
      populate: [
        { path: "l1_category" },
        { path: "l2_category" },
        { path: "l3_category" },
      ],
    });

    if (!user) {
      return next({ status: 404, message: "User not found." });
    }

    const activeWishListProduct = user.wishlist.filter(
      (product) => product.status === STATUS.ACTIVE
    );

    const deletedProducts = user.wishlist.filter(
      (product) => product.status === STATUS.DELETED
    );

    if (deletedProducts?.length) {
      user.wishlist = user.wishlist.filter(
        (product) => product.status !== STATUS.DELETED
      );
      await user.save();
    }

    req.successResponse = {
      message: "Wishlist fetched successfully.",
      data: activeWishListProduct,
    };

    return next();
  } catch (e) {
    return res.status(500).json({ error: true, message: e.message });
  }
};

module.exports = {
  removeProductFromWishList,
  addProductToWishList,
  getWishlistProducts,
};
