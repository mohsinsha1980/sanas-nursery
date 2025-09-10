import { Router } from "express";
import adminAuth from "../../middleware/admin-auth.js";
import {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
  toggleFeatured,
} from "../../controllers/admin/blogs.js";
import mediaUpload from "../../middleware/multer-upload.js";
import { MEDIA } from "../../lib/constants.js";

const router = Router();

router.use(adminAuth);

router.get("/", getAllBlogs);
router.get("/:blogId", getBlogById);
router.post("/", mediaUpload(MEDIA.Blogs), createBlog);
router.put("/:blogId", mediaUpload(MEDIA.Blogs), updateBlog);
router.delete("/:blogId", deleteBlog);

router.patch("/:blogId/status", toggleBlogStatus);
router.patch("/:blogId/featured", toggleFeatured);

export default router;
