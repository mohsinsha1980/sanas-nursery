import { Router } from "express";
import adminAuth from "../../middleware/admin-auth.js";
import {
  getCompContactEnquiries,
  getInCompContactEnquiries,
  updateContactEnquiryStatus,
} from "../../controllers/admin/contact-enquiries.js";

const router = Router();

router.get("/completed", adminAuth, getCompContactEnquiries);
router.get("/incomplete", adminAuth, getInCompContactEnquiries);
router.put("/:enquiryId", adminAuth, updateContactEnquiryStatus);

export default router;
