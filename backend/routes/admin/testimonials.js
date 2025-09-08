import { Router } from "express";
import {
  createTestimonial,
  updateTestimonial,
  getAllTestimonials,
  getTestimonialById,
  deleteTestimonial,
} from "../../controllers/admin/testimonials.js";

const routes = Router();

// Base: /api/admin/testimonials

routes.get("/", getAllTestimonials);
routes.get("/:testimonialId", getTestimonialById);
routes.post("/", createTestimonial);
routes.put("/:testimonialId", updateTestimonial);
routes.delete("/:testimonialId", deleteTestimonial);

export default routes;
