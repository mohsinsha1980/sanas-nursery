import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../config/env-config.js";
import { ROLES } from "../lib/constants.js";
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      required: true,
      default: ROLES.USER,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    config.ACCESS_TOKEN_SECRETS,
    {
      expiresIn: config.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    config.REFRESH_TOKEN_SECRETS,
    {
      expiresIn: config.REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", UserSchema);

export default User;
