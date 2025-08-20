import mongoose from "mongoose";
import config from "../config/env-config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB, {
      dbName: config.DB_NAME,
    });
    console.log("✅ Connected to database");
  } catch (err) {
    console.error("❌ Error connecting database:", err);
    process.exit(1);
  }
};

export default connectDB;
