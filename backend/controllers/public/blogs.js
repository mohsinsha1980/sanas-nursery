import { STATUS, BLOGS_PER_PAGE } from "../../lib/constants.js";
import Blog from "../../models/Blog.js";

// Get published blogs with pagination and filtering
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

    const { category, featured, search, sort } = req.query;
    let filter = {
      status: STATUS.ACTIVE,
      publishedAt: { $exists: true, $ne: null },
    };

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by featured
    if (featured === "true") {
      filter.featured = true;
    }

    // Search functionality
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    // Sort options
    let sortOption = { publishedAt: -1 }; // Default: newest first
    if (sort === "oldest") {
      sortOption = { publishedAt: 1 };
    } else if (sort === "popular") {
      // Sort by creation date for popular (no tracking)
      sortOption = { createdAt: -1 };
    }

    const total = await Blog.countDocuments(filter);
    const blogs = await Blog.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(per_page)
      .select("-__v -content") // Exclude full content for listing
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

// Get single published blog by slug (with view tracking)
export const getBlogBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) {
      return next({ status: 400, message: "Blog slug is required" });
    }

    const blog = await Blog.findOne({
      slug,
      status: STATUS.ACTIVE,
      publishedAt: { $exists: true, $ne: null },
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

// Get featured blogs
export const getFeaturedBlogs = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const blogs = await Blog.find({
      status: STATUS.ACTIVE,
      featured: true,
      publishedAt: { $exists: true, $ne: null },
    })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select("-__v -content")
      .exec();

    req.successResponse = {
      message: "Featured blogs retrieved successfully.",
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

// Get related blogs (same category, excluding current blog)
export const getRelatedBlogs = async (req, res, next) => {
  try {
    const { blogId, category } = req.query;
    const limit = parseInt(req.query.limit) || 4;

    if (!blogId || !category) {
      return next({
        status: 400,
        message: "Blog ID and category are required",
      });
    }

    const blogs = await Blog.find({
      _id: { $ne: blogId },
      status: STATUS.ACTIVE,
      category,
      publishedAt: { $exists: true, $ne: null },
    })
      .sort({ publishedAt: -1 })
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

// Get blog categories with counts
export const getBlogCategories = async (req, res, next) => {
  try {
    const categories = await Blog.aggregate([
      {
        $match: {
          status: STATUS.ACTIVE,
          publishedAt: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    req.successResponse = {
      message: "Blog categories retrieved successfully.",
      data: { categories },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

// Get popular blogs (most viewed)
export const getPopularBlogs = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;

    const blogs = await Blog.find({
      status: STATUS.ACTIVE,
      publishedAt: { $exists: true, $ne: null },
    })
      .sort({ createdAt: -1 })
      .limit(limit * 2) // Get more to sort by view count
      .select("-__v -content")
      .exec();

    req.successResponse = {
      message: "Popular blogs retrieved successfully.",
      data: { blogs: blogs.slice(0, limit) },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};
