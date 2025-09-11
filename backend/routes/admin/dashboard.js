import { Router } from "express";
import adminAuth from "../../middleware/admin-auth.js";
import { getDashboardStats } from "../../controllers/admin/dashboard.js";

const router = Router();

router.use(adminAuth);

router.get("/stats", getDashboardStats);

export default router;
