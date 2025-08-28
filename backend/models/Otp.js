import mongoose from "mongoose";
const { Schema } = mongoose;

const OtpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    expireIn: {
      type: Number,
      allowNull: false,
    },
  },
  {
    collection: "Otp",
    timestamps: true,
  }
);

const Otp = mongoose.model("Otp", OtpSchema);
export default Otp;
