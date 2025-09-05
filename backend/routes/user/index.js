import { Router } from "express";
import {
  getEnquiries,
  getUserWishlist,
  removeFromWishlist,
  updateUserPassword,
  updateUserProfile,
} from "../../controllers/user/index.js";
import { userAuth } from "../../middleware/user-auth.js";
const router = Router();

router.post("/profile", userAuth, updateUserProfile);
router.put("/update-password", userAuth, updateUserPassword);
router.get("/enquiries", userAuth, getEnquiries);
router.get("/wishlist", userAuth, getUserWishlist);
router.delete("/wishlist/:plantId", userAuth, removeFromWishlist);

export default router;
