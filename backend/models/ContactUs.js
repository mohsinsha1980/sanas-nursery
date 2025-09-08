import mongoose from "mongoose";

const ContactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "resolved", "closed"],
      default: "pending",
    },
  },
  { collection: "ContactUs", timestamps: true }
);

export const ContactUs = mongoose.model("ContactUs", ContactUsSchema);
