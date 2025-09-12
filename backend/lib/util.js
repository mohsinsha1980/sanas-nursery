import CryptoJS from "crypto-js";
import fs from "fs";
import { Types } from "mongoose";
import config from "../config/env-config.js";
const ObjectId = Types.ObjectId;

export const nameRegEx = /^[A-Za-z\s]+$/;
export const phoneRegEx = /^[6-9]\d{9}$/;
export const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const zipRegEx = /^[1-9]{1}\d{2}\s?\d{3}$/;
export const slugRegEx = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      // throw err;
    } else {
      callback(null, html);
    }
  });
};

export const isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

const WEEK_DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function getAMPMTime(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

const getFormattedDateAndTime = (inputDate) => {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const day = date.getDay();
  const curr_date = date.getDate();
  const formattedDay = ("0" + curr_date).slice(-2);
  const month = date.getMonth();
  const year = date.getFullYear();
  const time = getAMPMTime(date);

  return `${WEEK_DAYS[day]}, ${MONTH_NAMES[month]} ${formattedDay} ${year} at ${time}`;
};

const getFormattedDate = (inputDate) => {
  if (!inputDate) return "";
  const date = new Date(inputDate);
  const day = date.getDate();
  const formattedDay = ("0" + day).slice(-2);
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${MONTH_NAMES[month]}, ${formattedDay} ${year}`;
};

export const unlinkAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => (err ? reject(err) : resolve()));
  });
};

export const buildPlantFilter = async (query) => {
  const { sizes, tags, care_levels } = query;
  const filter = {};

  if (sizes) {
    filter.size = { $in: sizes.split(",") };
  }

  if (tags) {
    filter["tags.value"] = { $in: tags.split(",") };
  }

  if (care_levels) {
    filter.careLevel = { $in: care_levels.split(",") };
  }

  return filter;
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    config.ENCRYPTION_SECRET_KEY
  ).toString();
};

export const formatUserData = (user) =>
  encryptData({
    _id: user._id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    role: user.role,
  });

export const generateSlug = (nameValue) => {
  return nameValue.trim().toLowerCase().replace(/\s+/g, "-");
};

export const invalidSlug = (slug) => {
  if (slug.length < 3) {
    return "Slug must be at least 3 characters";
  }
  if (slug.length > 50) {
    return "Slug must not exceed 50 characters";
  }
  if (!slugRegEx.test(slug)) {
    return "Slug can only contain lowercase letters, numbers, and hyphens";
  }

  return false;
};
