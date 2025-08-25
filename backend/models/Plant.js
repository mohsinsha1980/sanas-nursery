import { Schema as _Schema, model } from "mongoose";
import { STATUS } from "../lib/constants.js";
const Schema = _Schema;

const Plant = new Schema(
  {
    plantId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    careLevel: {
      type: String,
    },
    tags: [
      {
        label: {
          type: String,
          required: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    summary: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      default: "",
    },
    specifications: [
      {
        label: {
          type: String,
          required: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    details: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    faqs: [
      {
        question: {
          type: String,
          required: true,
          trim: true,
        },
        answer: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    pictures: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    status: {
      type: String,
      required: true,
      default: STATUS.ACTIVE,
      enum: STATUS,
    },
  },
  {
    collection: "Plant",
    timestamps: true,
  }
);

export default model("Plant", Plant);
