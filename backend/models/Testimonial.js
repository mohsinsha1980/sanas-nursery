const mongoose = require("mongoose");
const { Schema } = mongoose;

const TestimonialSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  {
    collection: "Testimonials",
    timestamps: true,
  }
);

const Testimonial =
  mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);

module.exports = Testimonial;
