import { Router } from "express";
import adminAuth from "../../middleware/admin-auth.js";
import settingsRoutes from "./master-data.js";
import plantRoutes from "./plants.js";
import userRoutes from "./users.js";
import { getPlantsForGreenChoices } from "../../controllers/admin/plants.js";
const router = Router();
import homeRoutes from "./home.js";
import testimonialsRoutes from "./testimonials.js";
import orderEnquiriesRoutes from "./order-enquiries.js";
import contactEnquiriesRoutes from "./contact-enquiries.js";
import blogRoutes from "./blogs.js";
import dashboardRoutes from "./dashboard.js";

router.use("/users", adminAuth, userRoutes);
router.use("/testimonials", testimonialsRoutes);
router.use("/master-data", adminAuth, settingsRoutes);
router.use("/plants", adminAuth, plantRoutes);
router.use("/order-enquiries", orderEnquiriesRoutes);
router.use("/contact-enquiries", contactEnquiriesRoutes);
router.use("/blogs", blogRoutes);
router.use("/dashboard", dashboardRoutes);
router.get("/plants-list", getPlantsForGreenChoices);
router.use("/home", adminAuth, homeRoutes);

export default router;
