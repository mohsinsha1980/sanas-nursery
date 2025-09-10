import fs, { existsSync, unlinkSync } from "fs";
import { STATUS, BLOGS_PER_PAGE } from "../../lib/constants.js";
import Blog from "../../models/Blog.js";
import { generateSlug, invalidSlug } from "../../lib/util.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    if (!("page" in req.query) || !("per_page" in req.query)) {
      return next({ status: 400, message: "Pagination is required." });
    }
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page
      ? parseInt(req.query.per_page)
      : BLOGS_PER_PAGE;
    const skip = (page - 1) * per_page;

    const { status, category, featured, search } = req.query;
    let filter = {};

    if (status && Object.values(STATUS).includes(status)) {
      filter.status = status;
    } else {
      filter.status = { $ne: STATUS.DELETED };
    }

    if (category) {
      filter.category = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(per_page)
      .select("-__v")
      .exec();

    req.successResponse = {
      message: "Blogs retrieved successfully.",
      data: { blogs, total },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const getBlogById = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next({ status: 400, message: "Blog ID is required" });
    }

    const blog = await Blog.findById(blogId).select("-__v");
    if (!blog) {
      return next({ status: 404, message: "Blog not found" });
    }

    req.successResponse = {
      message: "Blog retrieved successfully.",
      data: blog,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const {
      title,
      excerpt,
      content,
      author,
      category,
      tags,
      metaTitle,
      metaDescription,
      readingTime,
      featured,
      status,
    } = req.body;

    if (!title || !excerpt || !content || !req.optimizedImagePath) {
      return next({
        status: 400,
        message:
          "All required fields (title, excerpt, content, coverImage, ) must be provided",
      });
    }

    const slug = generateSlug(title);
    if (invalidSlug(slug)) {
      return next({ message: "Invalid Slug", status: 400 });
    }

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return next({
        status: 400,
        message: "Blog with this slug already exists",
      });
    }

    const updatedTags = tags ? JSON.parse(tags) : [];
    const blog = new Blog({
      title,
      slug,
      excerpt,
      content,
      coverImage: req.optimizedImagePath,
      author,
      category,
      tags: updatedTags,
      metaTitle,
      metaDescription,
      readingTime: readingTime || null,
      featured: featured || false,
      status: status === STATUS.ACTIVE ? STATUS.ACTIVE : STATUS.INACTIVE,
    });

    await blog.save();
    req.successResponse = {
      message: "Blog created successfully.",
      data: blog,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const {
      title,
      excerpt,
      content,
      author,
      category,
      tags,
      metaTitle,
      metaDescription,
      readingTime,
      featured,
      status,
    } = req.body;

    if (!blogId) {
      return next({ status: 400, message: "Blog ID is required" });
    }

    if (!title || !excerpt || !content) {
      return next({
        status: 400,
        message:
          "All required fields (title, excerpt, content) must be provided",
      });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return next({ status: 404, message: "Blog not found" });
    }

    const slug = generateSlug(title);
    if (invalidSlug(slug)) {
      return next({ message: "Invalid Slug", status: 400 });
    }

    if (slug !== blog.slug) {
      const existingBlog = await Blog.findOne({ slug });
      if (existingBlog) {
        return next({
          status: 400,
          message: "Blog with this slug already exists",
        });
      }
    }

    const updatedTags =
      typeof tags === "string"
        ? JSON.parse(tags)
        : Array.isArray(tags)
        ? tags
        : [];

    const updatedBlog = {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      tags: updatedTags,
      metaTitle,
      metaDescription,
      readingTime: readingTime || 1,
      featured: featured || false,
      status: status === STATUS.ACTIVE ? STATUS.ACTIVE : STATUS.INACTIVE,
    };

    if (req.optimizedImagePath) {
      try {
        updatedBlog.coverImage = req.optimizedImagePath;
        const oldBlog = await Blog.findOne({
          _id: blogId,
        });

        if (oldBlog.coverImage) {
          if (existsSync(oldBlog.coverImage)) {
            fs.unlinkSync(oldBlog.coverImage);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.code !== "ENOENT") {
          return next({ status: 500, message: "Internal Server Error" });
        }
      }
    }

    const updatedBlogData = await Blog.findByIdAndUpdate(blogId, updatedBlog, {
      new: true,
      runValidators: true,
    }).select("-__v");

    req.successResponse = {
      message: "Blog updated successfully.",
      data: updatedBlogData,
    };
    return next();
  } catch (error) {
    console.log("error", error);
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next({ status: 400, message: "Blog ID is required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return next({ status: 404, message: "Blog not found" });
    }

    blog.status = STATUS.DELETED;
    await blog.save();

    req.successResponse = {
      message: "Blog deleted successfully.",
      data: { id: blogId },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const toggleBlogStatus = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    if (!blogId) {
      return next({ status: 400, message: "Blog ID is required" });
    }
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return next({ status: 404, message: "Blog not found" });
    }

    const newStatus =
      blog.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;
    blog.status = newStatus;

    await blog.save();

    req.successResponse = {
      message: `Blog ${
        newStatus === STATUS.ACTIVE ? "activated" : "deactivated"
      } successfully.`,
      data: blog,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const toggleFeatured = async (req, res, next) => {
  try {
    const { blogId } = req.params;

    if (!blogId) {
      return next({ status: 400, message: "Blog ID is required" });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return next({ status: 404, message: "Blog not found" });
    }

    blog.featured = !blog.featured;
    await blog.save();

    req.successResponse = {
      message: `Blog ${
        blog.featured ? "featured" : "unfeatured"
      } successfully.`,
      data: blog,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};
