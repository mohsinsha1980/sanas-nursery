import { Schema as _Schema, model } from "mongoose";
import { STATUS } from "../lib/constants.js";
const Schema = _Schema;

const Blog = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    content: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    readingTime: {
      type: Number,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      required: true,
      default: STATUS.ACTIVE,
      enum: Object.values(STATUS),
    },
  },
  {
    collection: "Blog",
    timestamps: true,
  }
);

export default model("Blog", Blog);
