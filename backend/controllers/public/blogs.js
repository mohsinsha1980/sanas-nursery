import {
  STATUS,
  BLOGS_PER_PAGE,
  RELATED_BLOG_COUNT,
} from "../../lib/constants.js";
import Blog from "../../models/Blog.js";

export const getPublishedBlogs = async (req, res, next) => {
  try {
    if (!("page" in req.query) || !("per_page" in req.query)) {
      return next({ status: 400, message: "Pagination is required." });
    }
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page
      ? parseInt(req.query.per_page)
      : BLOGS_PER_PAGE;
    const skip = (page - 1) * per_page;

    const { search } = req.query;
    let filter = {
      status: STATUS.ACTIVE,
    };

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
      .sort("-updatedAt")
      .skip(skip)
      .limit(per_page)
      .select("-__v -content")
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

export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return next({ status: 400, message: "Blog slug is required" });
    }

    const blog = await Blog.findOne({
      slug,
      status: STATUS.ACTIVE,
    }).select("-__v");

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

export const getRelatedBlogs = async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const limit = RELATED_BLOG_COUNT;

    if (!blogId) {
      return next({
        status: 400,
        message: "Blog ID is required",
      });
    }

    const currentBlog = await Blog.findById(blogId).select("category tags");
    if (!currentBlog) {
      return next({
        status: 404,
        message: "Blog not found",
      });
    }

    const { category, tags } = currentBlog;
    const tagValues = (tags || []).map((t) => t.value);
    const query = {
      _id: { $ne: blogId },
      status: STATUS.ACTIVE,
      $or: [{ category: category }, { "tags.value": { $in: tagValues } }],
    };

    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("-__v -content")
      .exec();

    req.successResponse = {
      message: "Related blogs retrieved successfully.",
      data: { blogs },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};
