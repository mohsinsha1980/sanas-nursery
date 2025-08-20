require("dotenv").config({ path: __dirname + "/.env" });
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const User = require("./models/User.js");
const bcrypt = require("bcryptjs");

const register = async () => {
  try {
    const hashed = await bcrypt.hash("Rgc@2096!", 10);
    const user = new User({
      email: "rashchop@gmail.com",
      password: hashed,
      first_name: "BharathaTechno IT",
      last_name: "Pvt Ltd",
      phone: "8421014146",
      is_verified: true,
      role: "Admin",
      active: true,
    });
    const createdUser = await User.create(user);
    console.log(createdUser);
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};

const DB = process.env.DB;

mongoose.connect(DB).then(
  () => {
    console.log("Connected to database");
    register();
  },
  (err) => {
    console.log("error connecting database: ");
    console.log(err);
  }
);
