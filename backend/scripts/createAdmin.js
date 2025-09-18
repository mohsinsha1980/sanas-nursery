import dotenv from "dotenv";
dotenv.config({ path: "/.env" });
import { hash } from "bcryptjs";
import { connect } from "mongoose";
import User from "../models/User.js";
import config from "../config/env-config.js";
Promise = global.Promise;

const register = async () => {
  try {
    const hashed = await hash("kH#365&65jdoP", 10);
    const user = new User({
      email: "sanasnursery@gmail.com",
      password: hashed,
      name: "Ganesh Sanas",
      phone: "8999481616",
      isVerified: true,
      role: "Admin",
    });
    const createdUser = await User.create(user);
    console.log(createdUser);
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

const DB = config.DB;

connect(DB).then(
  () => {
    console.log("Connected to database");
    register();
  },
  (err) => {
    console.log("error connecting database: ");
    console.log(err);
  }
);
