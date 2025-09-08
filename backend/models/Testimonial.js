import mongoose, { model } from "mongoose";
import { STATUS } from "../lib/constants.js";
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
    link: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      default: STATUS.ACTIVE,
      enum: STATUS,
    },
  },
  {
    collection: "Testimonials",
    timestamps: true,
  }
);

export default model("Testimonials", TestimonialSchema);
