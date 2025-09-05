import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const Subscription = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "Subscription",
    timestamps: true,
  }
);

export default model("Subscription", Subscription);
