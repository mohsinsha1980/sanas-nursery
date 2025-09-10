import { STATUS } from "../../lib/constants.js";
import Testimonial from "../../models/Testimonial.js";

export const createTestimonial = async (req, res, next) => {
  try {
    const { author, content, rating, link, status } = req.body;

    if (!author || !content || !rating) {
      return next({
        status: 400,
        message: "Author, content, and rating are required.",
      });
    }

    const numericRating = Number(rating);
    if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
      return next({
        status: 400,
        message: "Rating must be a number between 1 and 5.",
      });
    }

    const newTestimonial = await Testimonial.create({
      author,
      content,
      rating: numericRating,
      link,
      status: status === STATUS.ACTIVE ? STATUS.ACTIVE : STATUS.INACTIVE,
    });

    req.successResponse = {
      message: "Testimonial created successfully.",
      data: newTestimonial,
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message || "Internal server error while creating testimonial.",
    });
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const { testimonialId } = req.params;
    const { author, content, rating, link, status } = req.body;

    if (!testimonialId) {
      return res
        .status(400)
        .json({ error: true, message: "Testimonial ID is required." });
    }

    if (!author || !content || !rating) {
      return next({
        status: 400,
        message: "Author, content, and rating are required.",
      });
    }

    const numericRating = rating ? Number(rating) : 5;
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      {
        author,
        content,
        rating: numericRating,
        link,
        status: status ? STATUS.ACTIVE : STATUS.INACTIVE,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTestimonial) {
      return res
        .status(404)
        .json({ error: true, message: "Testimonial not found." });
    }

    req.successResponse = {
      message: "Testimonial updated successfully.",
      data: updatedTestimonial,
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message || "Internal server error while updating testimonial.",
    });
  }
};

export const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({
      status: { $ne: STATUS.DELETED },
    }).sort({ createdAt: -1 });

    req.successResponse = {
      message: "Testimonials fetched successfully.",
      data: testimonials,
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message:
        e.message || "Internal server error while fetching testimonials.",
    });
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const { testimonialId } = req.params;

    if (!testimonialId) {
      return next({ status: 400, message: "Testimonial ID is required." });
    }

    const deletedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      { status: STATUS.DELETED },
      { new: true }
    );

    if (!deletedTestimonial) {
      return next({ status: 404, message: "Testimonial not found." });
    }

    req.successResponse = {
      message: "Testimonial deleted successfully.",
      data: deletedTestimonial,
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message || "Internal server error while deleting testimonial.",
    });
  }
};

export const getTestimonialById = async (req, res, next) => {
  try {
    const { testimonialId } = req.params;

    if (!testimonialId) {
      return next({ status: 400, message: "Testimonial ID is required." });
    }

    const testimonial = await Testimonial.findOne({
      _id: testimonialId,
      status: { $ne: STATUS.DELETED }, // don’t return deleted
    });

    if (!testimonial) {
      return next({ status: 404, message: "Testimonial not found." });
    }

    req.successResponse = {
      message: "Testimonial fetched successfully.",
      data: testimonial,
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message:
        e.message || "Internal server error while fetching testimonial by ID.",
    });
  }
};
