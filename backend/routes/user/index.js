const express = require("express");
const router = express.Router();
const wishlistCtrl = require("../../controllers/user/wishlist");
const profileCtrl = require("../../controllers/user/profile");
const { userAuth } = require("../../middleware/user-auth");
const cartRoutes = require("./carts");
const reviewsRoutes = require("./reviews");
const checkoutRoutes = require("./checkout");
const orderRoutes = require("./orders");
const shiprocketRoutes = require("./shiprocket");
const commonCtrl = require("../../controllers/user/common");

router.post("/updateUserProfile", userAuth, profileCtrl.updateUserProfile);
router.post("/updateUserPassword", userAuth, profileCtrl.updateUserPassword);
router.post("/getEmailOtp", userAuth, profileCtrl.getEmailOtp);
router.post("/validateEmailOtp", userAuth, profileCtrl.validateEmailOtp);
router.post("/addAddress", userAuth, profileCtrl.addAddress);
router.post("/deleteAddress", userAuth, profileCtrl.deleteAddress);
router.use("/carts", userAuth, cartRoutes);
router.post("/wishlist", userAuth, wishlistCtrl.addProductToWishList);
router.get("/wishlist", userAuth, wishlistCtrl.getWishlistProducts);
router.delete(
  "/wishlist/:productId",
  userAuth,
  wishlistCtrl.removeProductFromWishList
);

router.use("/reviews", userAuth, reviewsRoutes);
router.use("/checkout", userAuth, checkoutRoutes);
router.use("/orders", userAuth, orderRoutes);
router.use("/delivery", userAuth, shiprocketRoutes);

router.post("/support", commonCtrl.createSupport);

module.exports = router;
