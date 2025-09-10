import { Router } from "express";
import adminAuth from "../../middleware/admin-auth.js";
import {
  getCompOrderEnquiries,
  getInCompOrderEnquiries,
  updateOrderEnquiryStatus,
} from "../../controllers/admin/order-enquiries.js";
const router = Router();

router.get("/completed", adminAuth, getCompOrderEnquiries);
router.get("/incomplete", adminAuth, getInCompOrderEnquiries);
router.put("/:enquiryId", adminAuth, updateOrderEnquiryStatus);

export default router;
