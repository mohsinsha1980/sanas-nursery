import fs from "fs";
import { SORT } from "./constants.js";
import { Types } from "mongoose";
import CryptoJS from "crypto-js";
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

// function toBase64(filePath) {
//   const img = fs.readFileSync(filePath);
//   const mime_type = mime.getType(filePath);
//   const base64String = Buffer.from(img).toString("base64");
//   const withPrefix = `data:${mime_type};base64,` + base64String;
//   return withPrefix;
// }

const isValidObjectId = (id) => {
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

const unlinkAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => (err ? reject(err) : resolve()));
  });
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phoneRegex = /^[6-9]\d{9}$/;

// const buildCategoryTree = (categories) => {
//   try {
//     const categoryMap = {};
//     const tree = [];

//     categories.forEach((cat) => {
//       categoryMap[cat._id] = { ...cat, children: [] };
//     });

//     categories.forEach((cat) => {
//       if (cat.level === CATEGORY_LEVEL.LEVEL1) {
//         tree.push(categoryMap[cat._id]);
//       } else if (cat.level === CATEGORY_LEVEL.LEVEL2 && cat.l1_category) {
//         categoryMap[cat.l1_category]?.children.push(categoryMap[cat._id]);
//       } else if (cat.level === CATEGORY_LEVEL.LEVEL3 && cat.l2_category) {
//         categoryMap[cat.l2_category]?.children.push(categoryMap[cat._id]);
//       }
//     });

//     return { error: false, data: tree };
//   } catch (error) {
//     return { error: true, data: [] };
//   }
// };

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

const productSortQuery = (sort) => {
  switch (sort) {
    case SORT.BEST_SELLER:
      return [
        { $addFields: { totalSold: { $sum: "$variants.soldQuantity" } } },
        { $sort: { totalSold: -1 } },
      ];
    case SORT.TOP_RATED:
      return { avgRating: -1 };
    case SORT.PRICE_ASC:
      return [
        { $addFields: { minPrice: { $min: "$variants.sellingPrice" } } },
        { $sort: { minPrice: 1 } },
      ];
    case SORT.PRICE_DESC:
      return [
        { $addFields: { maxPrice: { $max: "$variants.sellingPrice" } } },
        { $sort: { maxPrice: -1 } },
      ];
    default:
      return { createdAt: -1 };
  }
};

// const formatNavList = (categories, parentPath = "") => {
//   return categories.map((category) => {
//     const categoryPath = `${parentPath}/${category.slug}`;

//     const formattedCategory = {
//       id: category._id.toString(),
//       label: category.label,
//       link: categoryPath,
//     };

//     if (category.children && category.children.length > 0) {
//       formattedCategory.children = formatNavList(
//         category.children,
//         categoryPath
//       );
//     }

//     return formattedCategory;
//   });
// };

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const getFormattedPicURL = (endpoint) => {
  if (!endpoint) return "";
  return `${process.env.NEXT_PUBLIC_BACKEND}/${endpoint}`;
};

// const constructProductLink = (product) => {
//   let link = "/";
//   link = link + product.l1_category.slug + "/" + product.l2_category.slug;
//   if (product.l3_category?.slug) {
//     link = link + "/" + product.l3_category.slug;
//   }
//   link = link + "/" + product.slug + "/" + product._id;
//   return link;
// };

// const constructCategoryLink = (product) => {
//   let link = "/";
//   link = link + product.l1_category.slug + "/" + product.l2_category.slug;
//   if (product.l3_category?.slug) {
//     link = link + "/" + product.l3_category.slug;
//   }
//   link = link + "/" + product.slug + "/" + product._id;
//   return link;
// };

const buildQueryString = (searchParams) => {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([Key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(Key, v.toString()));
      } else {
        params.append(Key, value.toString());
      }
    }
  });

  return params.toString() ? "?" + params.toString() : "";
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
