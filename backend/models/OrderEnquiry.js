import mongoose, { Schema } from "mongoose";

const enquirySchema = new mongoose.Schema(
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
    preferredContactTime: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    plantId: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "resolved", "closed"],
      default: "pending",
    },
  },
  { collection: "OrderEnquiry", timestamps: true }
);

export const OrderEnquiry = mongoose.model("OrderEnquiry", enquirySchema);
