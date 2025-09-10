import { Router } from "express";
import {
  getBlogBySlug,
  getPublishedBlogs,
  getRelatedBlogs,
} from "../../controllers/public/blogs.js";

const router = Router();

router.get("/", getPublishedBlogs);
router.get("/:slug", getBlogBySlug);
router.get("/related/:blogId", getRelatedBlogs);

export default router;
