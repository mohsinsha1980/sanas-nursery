import dotenv from "dotenv";
import { connect } from "mongoose";
import config from "../config/env-config.js";
import Settings from "../models/Settings.js";
dotenv.config({ path: "/.env" });
Promise = global.Promise;

import Blog from "../models/Blog.js";
import { ContactUs } from "../models/ContactUs.js";
import Home from "../models/Home.js";
import { OrderEnquiry } from "../models/OrderEnquiry.js";
import Plant from "../models/Plant.js";
import Testimonials from "../models/Testimonial.js";
import Wishlist from "../models/Wishlist.js";

const modelsToClean = [
  Blog,
  Home,
  Plant,
  Settings,
  Testimonials,
  ContactUs,
  OrderEnquiry,
  Wishlist,
];

const cleanUp = async () => {
  try {
    console.log("Cleaning up collections...");
    for (const model of modelsToClean) {
      const result = await model.deleteMany({});
      console.log(
        `Deleted ${result.deletedCount} records from ${model.modelName}.`
      );
    }
  } catch (e) {
    console.error("Error during cleanup:", e);
    process.exit(1);
  }
};

const DB = config.DB;

connect(DB).then(
  () => {
    console.log("Connected to database");
    cleanUp();
  },
  (err) => {
    console.log("error connecting database: ");
    console.log(err);
  }
);
