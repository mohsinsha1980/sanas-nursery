import { Router } from "express";
import {
  getPublishedBlogs,
  getBlogBySlug,
  getFeaturedBlogs,
  getRelatedBlogs,
  getBlogCategories,
  getPopularBlogs,
} from "../../controllers/public/blogs.js";

const router = Router();

router.get("/", getPublishedBlogs);
router.get("/featured", getFeaturedBlogs);
router.get("/popular", getPopularBlogs);
router.get("/categories", getBlogCategories);
router.get("/related", getRelatedBlogs);
router.get("/:slug", getBlogBySlug);

export default router;
