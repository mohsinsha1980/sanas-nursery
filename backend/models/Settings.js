import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const fieldSchema = {
  label: { type: String, required: true },
  value: { type: String, required: true },
};

const Settings = new Schema(
  {
    tags: {
      type: [fieldSchema],
    },
    blogTags: {
      type: [fieldSchema],
    },
  },
  {
    collection: "MasterData",
    timestamps: true,
  }
);

export default model("Settings", Settings);
