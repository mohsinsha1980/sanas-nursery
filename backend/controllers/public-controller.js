const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Category = require("../models/Category");
const Product = require("../models/Product");
const Review = require("../models/Review");
const Gallery = require("../models/Gallery");
const ContactUs = require("../models/ContactUs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const {
  STATUS,
  PRODUCTS_PER_PAGE,
  MAX_TRENDY_PRODUCT,
  SORT,
  CATEGORY_LEVEL,
  PRICE_FILTER_OPT,
  PRICE_RANGE_MAX,
} = require("../lib/constants");
const {
  buildProductFilter,
  buildCategoryTree,
  formatNavList,
  emailRegex,
  productSortQuery,
  constructProductLink,
  phoneRegex,
  readHTMLFile,
  formatUserData,
} = require("../lib/util");
const Home = require("../models/Home");
const MasterData = require("../models/Settings");
const Subscription = require("../models/Subscription");
const { clearAuthCookies, setAuthCookies } = require("../middleware/user-auth");
const { log } = require("../services/logger");
const mailClient = require("../config/mailConfig");

const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return next({
        status: 401,
        message: "Unauthorized: No refresh token provided",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETS);
    const user = await User.findById(decoded._id);
    if (!user || user.refreshToken !== refreshToken) {
      clearAuthCookies(res);
      return next({
        status: 403,
        message: "RefreshTokenExpiredError",
      });
      // return next({
      //   status: 401,
      //   message:
      //     "*** Invalid refresh token. Please try clearing your browser cookies and log in again. ***",
      // });
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();
    user.refreshToken = newRefreshToken;
    await user.save();
    setAuthCookies(res, newAccessToken, newRefreshToken);
    req.userData = user;

    req.successResponse = {
      message: "Access token refreshed successfully.",
      data: "",
    };

    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      clearAuthCookies(res);
      return next({
        status: 403,
        message: "RefreshTokenExpiredError",
      });
    } else {
      return next({
        status: 500,
        message: `*** ${error.message} , Please login again! ***`,
      });
    }
  }
};

const populateProductCatL1 = [
  {
    $lookup: {
      from: "Category",
      let: { l1CategoryId: { $toObjectId: "$l1_category" } },
      pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$l1CategoryId"] } } }],
      as: "l1_category",
    },
  },
  { $unwind: { path: "$l1_category", preserveNullAndEmptyArrays: true } },
  {
    $project: {
      __v: 0,
      updatedAt: 0,
    },
  },
];

const populateProductCatL2 = [
  {
    $lookup: {
      from: "Category",
      let: { l1CategoryId: { $toObjectId: "$l1_category" } },
      pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$l1CategoryId"] } } }],
      as: "l1_category",
    },
  },
  { $unwind: { path: "$l1_category", preserveNullAndEmptyArrays: true } },

  {
    $lookup: {
      from: "Category",
      let: { l2CategoryId: { $toObjectId: "$l2_category" } },
      pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$l2CategoryId"] } } }],
      as: "l2_category",
    },
  },
  { $unwind: { path: "$l2_category", preserveNullAndEmptyArrays: true } },

  {
    $project: {
      __v: 0,
      updatedAt: 0,
    },
  },
];

const populateProductCatL3 = [
  {
    $lookup: {
      from: "Category",
      let: { l1CategoryId: { $toObjectId: "$l1_category" } },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$l1CategoryId"] } } },
        // { $project: { __v: 0, updatedAt: 0, createdAt: 0 } },
      ],
      as: "l1_category",
    },
  },
  { $unwind: { path: "$l1_category", preserveNullAndEmptyArrays: true } },

  {
    $lookup: {
      from: "Category",
      let: { l2CategoryId: { $toObjectId: "$l2_category" } },
      pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$l2CategoryId"] } } }],
      as: "l2_category",
    },
  },
  { $unwind: { path: "$l2_category", preserveNullAndEmptyArrays: true } },

  {
    $lookup: {
      from: "Category",
      let: { l3CategoryId: { $toObjectId: "$l3_category" } },
      pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$l3CategoryId"] } } }],
      as: "l3_category",
    },
  },
  { $unwind: { path: "$l3_category", preserveNullAndEmptyArrays: true } },

  {
    $project: {
      __v: 0,
      updatedAt: 0,
    },
  },
];

const getNavbar = async (req, res, next) => {
  try {
    const categories = await Category.find({ status: STATUS.ACTIVE })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    const tree = buildCategoryTree(categories);

    if (tree.error) {
      return next({
        message: "An error occurred while fetching categories tree.",
        status: 500,
      });
    }

    const formattedNavList = formatNavList(tree.data);

    req.successResponse = {
      message: "Categories retrieved successfully.",
      data: formattedNavList,
    };

    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      _id: req.userData._id,
    }).populate("wishlist");

    if (!foundUser) {
      return next({ status: 404, message: "User not found" });
    }

    if (!foundUser.is_verified || !foundUser.active) {
      return next({
        status: 404,
        message: "User is not active or not verified",
      });
    }

    const activeWishlist = foundUser.wishlist
      .filter((product) => product.status === STATUS.ACTIVE)
      .map((product) => product._id);

    const deletedProductIds = foundUser.wishlist
      .filter((product) => product.status === STATUS.DELETED)
      .map((product) => product._id);

    if (deletedProductIds?.length) {
      foundUser.wishlist = foundUser.wishlist
        .filter((product) => product.status !== STATUS.DELETED)
        .map((product) => product._id);

      await foundUser.save();
    }

    const formattedUser = formatUserData({
      ...foundUser.toObject(),
      wishlist: activeWishlist,
    });

    req.successResponse = {
      message: "User retrieved successfully.",
      data: formattedUser,
    };
    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message,
    });
  }
};

const getMasterData = async (req, res, next) => {
  try {
    const masterData = await MasterData.findOne();

    const updatedData = masterData
      ? {
          colors: masterData.colors || [],
          materials: masterData.materials || [],
          styles: masterData.styles || [],
          taxCharges: masterData.taxCharges || [],
          sizes: masterData.sizes || [],
        }
      : {
          colors: [],
          materials: [],
          styles: [],
          taxCharges: [],
          sizes: [],
        };

    const highestMrpResult = await Product.aggregate([
      { $unwind: "$variants" },
      {
        $group: {
          _id: null,
          highestMrp: { $max: "$variants.mrp" },
        },
      },
    ]);

    const highestMrp =
      highestMrpResult.length > 0
        ? highestMrpResult[0].highestMrp
        : PRICE_RANGE_MAX;

    updatedData.highestMrp = highestMrp;

    req.successResponse = {
      message: "MasterData retrieved successfully",
      data: updatedData,
    };

    return next();
  } catch (e) {
    return next({
      message: e.message || " An error occurred while fetching Master Data",
      status: 500,
    });
  }
};

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ status: STATUS.ACTIVE })
      .select("-__v -updatedAt -createdAt")
      .lean();

    req.successResponse = {
      message: "Categories retrieved successfully.",
      data: categories,
    };

    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getL2Categories = async (req, res, next) => {
  try {
    const { l1_category_slug } = req.params;

    if (!l1_category_slug) {
      return next({
        message: "L1 Category is required",
        status: 400,
      });
    }

    const l1Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "1",
      slug: l1_category_slug,
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    if (!l1Category || !l1Category._id) {
      return next({
        message: "Data not found",
        status: 404,
      });
    }

    const l2Categories = await Category.find({
      status: STATUS.ACTIVE,
      level: "2",
      l1_category: l1Category._id.toString(),
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    req.successResponse = {
      message: "Categories retrieved successfully.",
      data: { l1: l1Category, l2: l2Categories },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getL3Categories = async (req, res, next) => {
  try {
    const { l1_category_slug, l2_category_slug } = req.params;

    if (!l1_category_slug || !l2_category_slug) {
      return next({
        message: "L1 & L2 Categories are required",
        status: 400,
      });
    }

    const l1Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "1",
      slug: l1_category_slug,
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    const l2Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "2",
      slug: l2_category_slug,
      l1_category: l1Category._id.toString(),
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    if (!l1Category || !l1Category._id || !l2Category || !l2Category._id) {
      return next({
        message: "Data not found",
        status: 404,
      });
    }

    const l3Categories = await Category.find({
      status: STATUS.ACTIVE,
      level: "3",
      l1_category: l1Category._id.toString(),
      l2_category: l2Category._id.toString(),
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    req.successResponse = {
      message: "Categories retrieved successfully.",
      data: { l1: l1Category, l2: l2Category, l3: l3Categories },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findOne({
      _id: product_id,
      status: STATUS.ACTIVE,
    })
      .populate([
        { path: "l1_category", select: "-__v -updatedAt -createdAt" },
        { path: "l2_category", select: "-__v -updatedAt -createdAt" },
        { path: "l3_category", select: "-__v -updatedAt -createdAt" },
      ])
      .select("-__v -updatedAt -createdAt")
      .lean();

    if (!product || !product._id) {
      return next({
        message: "Data not found",
        status: 404,
      });
    }

    const reviews = await Review.find({ productId: product._id, status: true })
      .populate({ path: "user", select: "first_name last_name active" })
      .lean()
      .select("title description user rating");

    req.successResponse = {
      message: "Product details retrieved successfully.",
      data: { product, reviews },
    };

    return next();
  } catch (e) {
    return res.status(500).json({
      error: true,
      message: e.message,
    });
  }
};

const getProductsInL1 = async (req, res, next) => {
  try {
    const { l1_category_slug } = req.params;
    const { page, sort } = req.query;

    if (!l1_category_slug) {
      return next({
        message: "L1 Category is required",
        status: 400,
      });
    }

    const l1Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "1",
      slug: l1_category_slug,
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    if (!l1Category || !l1Category._id) {
      return next({
        message: "Data not found",
        status: 404,
      });
    }

    const skip = page && page > 0 ? (page - 1) * PRODUCTS_PER_PAGE : 0;
    const serachQuery = await buildProductFilter(req.query);

    const productsTotal = await Product.countDocuments({
      ...serachQuery,
      status: STATUS.ACTIVE,
      l1_category: l1Category._id.toString(),
    });

    let products = [];
    let sortQuery = productSortQuery(sort);
    if (
      sort === SORT.BEST_SELLER ||
      sort === SORT.PRICE_ASC ||
      sort === SORT.PRICE_DESC
    ) {
      products = await Product.aggregate([
        {
          $match: {
            ...serachQuery,
            status: STATUS.ACTIVE,
            l1_category: l1Category._id.toString(),
          },
        },
        ...sortQuery,
        { $skip: skip },
        { $limit: PRODUCTS_PER_PAGE },
        ...populateProductCatL1,
      ]).exec();
    } else {
      products = await Product.find({
        ...serachQuery,
        status: STATUS.ACTIVE,
        l1_category: l1Category._id.toString(),
      })
        .populate([
          { path: "l1_category", select: "-__v -updatedAt -createdAt" },
          { path: "l2_category", select: "-__v -updatedAt -createdAt" },
          { path: "l3_category", select: "-__v -updatedAt -createdAt" },
        ])
        .select("-__v -updatedAt -createdAt")
        .sort(sortQuery)
        .skip(skip)
        .limit(PRODUCTS_PER_PAGE)
        .lean()
        .exec();
    }

    const updatedProducts = products.map((item) => {
      return {
        ...item,
        l1_category: l1Category,
      };
    });

    req.successResponse = {
      message: "Data retrieved successfully.",
      data: {
        l1: l1Category,
        products: updatedProducts,
        total: productsTotal,
      },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getProductsInL2 = async (req, res, next) => {
  try {
    const { l1_category_slug, l2_category_slug } = req.params;
    const { page, sort } = req.query;

    if (!l1_category_slug || !l2_category_slug) {
      return next({
        message: "L1 & L2 Categories are required",
        status: 400,
      });
    }

    const l1Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "1",
      slug: l1_category_slug,
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    const l2Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "2",
      slug: l2_category_slug,
      l1_category: l1Category._id.toString(),
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    if (!l1Category || !l1Category._id || !l2Category || !l2Category._id) {
      return next({
        message: "Data not found",
        status: 404,
      });
    }

    const serachQuery = await buildProductFilter(req.query);

    const productsTotal = await Product.countDocuments({
      ...serachQuery,
      status: STATUS.ACTIVE,
      l1_category: l1Category._id.toString(),
      l2_category: l2Category._id.toString(),
    });

    const skip = page && page > 0 ? (page - 1) * PRODUCTS_PER_PAGE : 0;
    let products = [];
    let sortQuery = productSortQuery(sort);
    if (
      sort === SORT.BEST_SELLER ||
      sort === SORT.PRICE_ASC ||
      sort === SORT.PRICE_DESC
    ) {
      products = await Product.aggregate([
        {
          $match: {
            ...serachQuery,
            status: STATUS.ACTIVE,
            l1_category: l1Category._id.toString(),
            l2_category: l2Category._id.toString(),
          },
        },
        ...sortQuery,
        { $skip: skip },
        { $limit: PRODUCTS_PER_PAGE },
        ...populateProductCatL2,
      ]).exec();
    } else {
      products = await Product.find({
        ...serachQuery,
        status: STATUS.ACTIVE,
        l1_category: l1Category._id.toString(),
        l2_category: l2Category._id.toString(),
      })
        .populate([
          { path: "l1_category", select: "-__v -updatedAt -createdAt" },
          { path: "l2_category", select: "-__v -updatedAt -createdAt" },
          { path: "l3_category", select: "-__v -updatedAt -createdAt" },
        ])
        .select("-__v -updatedAt -createdAt")
        .sort(sortQuery)
        .skip(skip)
        .limit(PRODUCTS_PER_PAGE)
        .lean()
        .exec();
    }

    const updatedProducts = products.map((item) => {
      return {
        ...item,
        l1_category: l1Category,
        l2_category: l2Category,
      };
    });

    req.successResponse = {
      message: "Data retrieved successfully.",
      data: {
        l1: l1Category,
        l2: l2Category,
        products: updatedProducts,
        total: productsTotal,
      },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getProductsInL3 = async (req, res, next) => {
  try {
    const { l1_category_slug, l2_category_slug, l3_category_slug } = req.params;
    const { page, sort } = req.query;

    if (!l1_category_slug || !l2_category_slug || !l3_category_slug) {
      return next({
        message: "L1, L2 & L3 Categories are required",
        status: 400,
      });
    }
    const l1Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "1",
      slug: l1_category_slug,
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    const l2Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "2",
      slug: l2_category_slug,
      l1_category: l1Category._id.toString(),
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    const l3Category = await Category.findOne({
      status: STATUS.ACTIVE,
      level: "3",
      slug: l3_category_slug,
      l1_category: l1Category._id.toString(),
      l2_category: l2Category._id.toString(),
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    if (
      !l1Category ||
      !l1Category._id ||
      !l2Category ||
      !l2Category._id ||
      !l3Category ||
      !l3Category._id
    ) {
      return next({
        message: "Data not found",
        status: 404,
      });
    }

    const serachQuery = await buildProductFilter(req.query);
    const productsTotal = await Product.countDocuments({
      ...serachQuery,
      status: STATUS.ACTIVE,
      l1_category: l1Category._id.toString(),
      l2_category: l2Category._id.toString(),
      l3_category: l3Category._id.toString(),
    });

    const skip = page && page > 0 ? (page - 1) * PRODUCTS_PER_PAGE : 0;

    let products = [];
    let sortQuery = productSortQuery(sort);
    if (
      sort === SORT.BEST_SELLER ||
      sort === SORT.PRICE_ASC ||
      sort === SORT.PRICE_DESC
    ) {
      products = await Product.aggregate([
        {
          $match: {
            ...serachQuery,
            status: STATUS.ACTIVE,
            l1_category: l1Category._id.toString(),
            l2_category: l2Category._id.toString(),
            l3_category: l3Category._id.toString(),
          },
        },
        ...sortQuery,
        { $skip: skip },
        { $limit: PRODUCTS_PER_PAGE },
        ...populateProductCatL3,
      ]).exec();
    } else {
      products = await Product.find({
        ...serachQuery,
        status: STATUS.ACTIVE,
        l1_category: l1Category._id.toString(),
        l2_category: l2Category._id.toString(),
        l3_category: l3Category._id.toString(),
      })
        .sort(sortQuery)
        .select("-__v -updatedAt -createdAt")
        .skip(skip)
        .limit(PRODUCTS_PER_PAGE)
        .lean()
        .exec();
    }

    const updatedProducts = products.map((item) => {
      return {
        ...item,
        l1_category: l1Category,
        l2_category: l2Category,
        l3_category: l3Category,
      };
    });

    req.successResponse = {
      message: "Categories retrieved successfully.",
      data: {
        l1: l1Category,
        l2: l2Category,
        l3: l3Category,
        products: updatedProducts,
        total: productsTotal,
      },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getGalleryImages = async (req, res, next) => {
  try {
    const gallery = await Gallery.find()
      .select("-__v -updatedAt -createdAt")
      .lean();

    req.successResponse = {
      message: "Images retrieved successfully.",
      data: gallery,
    };

    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching categories.",
      status: 500,
    });
  }
};

const getPublicHomeData = async (req, res, next) => {
  try {
    let homeData = await Home.findOne();
    req.successResponse = {
      message: "Home data retrieved successfully",
      data: homeData,
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};

const getTrendyProducts = async (req, res, next) => {
  try {
    const newArrivals = await Product.find({
      status: STATUS.ACTIVE,
    })
      .populate([
        { path: "l1_category", select: "-__v -updatedAt -createdAt" },
        { path: "l2_category", select: "-__v -updatedAt -createdAt" },
        { path: "l3_category", select: "-__v -updatedAt -createdAt" },
      ])
      .sort({ createdAt: -1 })
      .select("-__v -updatedAt -createdAt")
      .limit(MAX_TRENDY_PRODUCT)
      .lean()
      .exec();

    const bestSellers = await Product.aggregate([
      {
        $match: { status: STATUS.ACTIVE },
      },
      {
        $addFields: {
          totalSold: {
            $sum: "$variants.soldQuantity",
          },
        },
      },
      {
        $sort: { totalSold: -1 },
      },
      ...populateProductCatL3,
      {
        $limit: MAX_TRENDY_PRODUCT,
      },
    ]).exec();

    let topRatedProducts = await Product.find({
      status: STATUS.ACTIVE,
    })
      .populate([
        { path: "l1_category", select: "-__v -updatedAt -createdAt" },
        { path: "l2_category", select: "-__v -updatedAt -createdAt" },
        { path: "l3_category", select: "-__v -updatedAt -createdAt" },
      ])
      .sort({ avgRating: -1 })
      .select("-__v -updatedAt -createdAt")
      .limit(MAX_TRENDY_PRODUCT)
      .lean()
      .exec();

    req.successResponse = {
      message: "Home data retrieved successfully",
      data: { newArrivals, topRated: topRatedProducts, bestSellers },
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};

const getAccessories = async (req, res, next) => {
  try {
    const accessories = await Product.find({ status: STATUS.ACTIVE })
      .populate([
        { path: "l1_category", select: "-__v -updatedAt -createdAt" },
        { path: "l2_category", select: "-__v -updatedAt -createdAt" },
        { path: "l3_category", select: "-__v -updatedAt -createdAt" },
      ])
      .select("-__v -updatedAt -createdAt")
      .lean();

    const filteredAccessories = accessories
      .filter(
        (product) =>
          product.l1_category?.slug === "accessories" ||
          product.l2_category?.slug === "accessories"
      )
      .slice(0, 5);

    req.successResponse = {
      message: "Accessories retrieved successfully",
      data: filteredAccessories,
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};

const addSubscription = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return next({ message: "Email is required", status: 400 });
    }

    if (!emailRegex.test(email)) {
      return next({ message: "Invalid Email Format", status: 400 });
    }
    const checkforexistingUser = await Subscription.findOne({ email });
    if (checkforexistingUser) {
      return next({ message: "Email is already subscribed", status: 400 });
    }

    const newSubscription = new Subscription({ email });
    await newSubscription.save();
    req.successResponse = {
      message: "Subscription successful!",
      data: newSubscription,
    };
    return next();
  } catch (error) {
    return next({ message: "Internal Server Error", status: 500 });
  }
};

const searchOptionsByField = (field, products) => {
  return products.map((product) => {
    if (!product[field]) return;
    return {
      label: product[field],
      url: constructProductLink(product),
    };
  });
};

const categoryOptionsByDesc = (categories) => {
  const optionsByDesc = categories
    .filter((c) => c.description)
    .map((category) => {
      let url = `/${category.slug}`;

      if (
        category?.level === CATEGORY_LEVEL.LEVEL2 &&
        category.l1_category?.slug
      ) {
        url = `/` + category.l1_category.slug + `/${category.slug}`;
      } else if (
        category.level === CATEGORY_LEVEL.LEVEL3 &&
        category.l1_category?.slug &&
        category.l2_category?.slug
      ) {
        url =
          `/` +
          category.l1_category?.slug +
          `/` +
          category.l2_category?.slug +
          `/${category.slug}`;
      }

      return {
        // label:
        //   (category.l1_category?.label || "-") +
        //   (category.l2_category?.label || "-") +
        //   category.label, // change here to description
        label: category.description,
        url,
      };
    });

  return optionsByDesc;
};

const colorsOptFotL3Category = (categories, colors) => {
  let searchOptions = [];
  categories
    .filter((cat) => cat.level === CATEGORY_LEVEL.LEVEL3)
    .forEach((category) => {
      colors.forEach((color) => {
        let url =
          `/` +
          category.l1_category.slug +
          `/` +
          category.l2_category.slug +
          `/${category.slug}` +
          `?colors=${color.toLowerCase()}`;

        let label = `${color} ${category.label} For ${category.l1_category?.label}`;

        searchOptions.push({
          label,
          url,
        });
      });
    });

  return searchOptions;
};

const priceOptFotL3Category = (categories) => {
  let searchOptions = [];
  categories
    .filter((cat) => cat.level === CATEGORY_LEVEL.LEVEL3)
    .forEach((category) => {
      PRICE_FILTER_OPT.forEach((mrp) => {
        let url =
          `/` +
          category.l1_category.slug +
          `/` +
          category.l2_category.slug +
          `/${category.slug}` +
          `?price_range=${mrp},5000`; // max mrp

        let label = `${category.label} For ${category.l1_category?.label} Under ${mrp}`;

        searchOptions.push({
          label,
          url,
        });
      });
    });

  return searchOptions;
};

const getGlobalSearchOpt = async (req, res, next) => {
  try {
    const products = await Product.find({ status: STATUS.ACTIVE })
      .populate([
        { path: "l1_category" },
        { path: "l2_category" },
        { path: "l3_category" },
      ])
      .select("title slug l1_category l2_category l3_category metaDescription")
      .lean();

    const optionsByProductTitle = searchOptionsByField("title", products);
    const optionsByProductMeta = searchOptionsByField(
      "metaDescription",
      products
    );

    const categories = await Category.find({ status: STATUS.ACTIVE })
      .populate([
        { path: "l1_category", select: "-__v -updatedAt -createdAt" },
        { path: "l2_category", select: "-__v -updatedAt -createdAt" },
      ])
      .select("name slug l1_category l2_category description label level")
      .lean();

    const optionsByCategoryDesc = categoryOptionsByDesc(categories);

    const masterData = await MasterData.findOne().lean().exec();
    const colors = masterData?.colors?.map((c) => c.label) || [];

    const optionsByColorForL3 = colorsOptFotL3Category(categories, colors);
    const optionsByPriceForL3 = priceOptFotL3Category(categories);

    req.successResponse = {
      message: "Search list fetched successfully!",
      data: [
        ...optionsByProductTitle,
        ...optionsByProductMeta,
        ...optionsByCategoryDesc,
        ...optionsByColorForL3,
        ...optionsByPriceForL3,
      ],
    };

    return next();
  } catch (error) {
    return next({ message: "Internal Server Error", status: 500 });
  }
};

const createContactUs = async (req, res, next) => {
  try {
    const { full_name, email, phone, message } = req.body;

    if (!full_name || !phone || !email || !message) {
      return next({
        message: "Mandatory field is missing full_name ,phone , and message",
        status: 401,
      });
    }

    if (!emailRegex.test(email) || !phoneRegex.test(phone)) {
      return next({ message: "Email or phone is invalid", status: 401 });
    }

    const newContact = new ContactUs({
      full_name,
      phone,
      email,
      message,
      file: req.savedPDFPath || "",
      pictures: req.optimizedImagePaths || [],
    });

    await newContact.save();

    readHTMLFile(
      path.join(__dirname + "../../templates/enquiry.html"),
      async function (readFileErr, html) {
        if (readFileErr) {
          return next({
            status: 500,
            message: "Error reading email template",
          });
        }
        const template = handlebars.compile(html);
        const replacements = {
          enquiryLink: process.env.FRONTEND_ADMIN_ENQUIRY,
          supportEmail: process.env.SUPPORT_EMAIL,
        };
        const htmlToSend = template(replacements);

        try {
          await mailClient.sendMail({
            from: {
              address: process.env.EMAIL_FROM,
              name: "TrendyThreads",
            },
            to: [
              {
                email_address: {
                  address: process.env.INFO_EMAIL,
                  name: "Info",
                },
              },
            ],
            subject: "Trendy Threads: Contact Us",
            htmlbody: htmlToSend,
          });
        } catch (err) {
          if (err) {
            log({
              level: "error",
              user: req.userData?._id || "",
              url: "createContactUs",
              message: err.message,
            });
            return;
          }
        }
      }
    );

    req.successResponse = {
      message: "Your contact form has been submitted successfully!",
      data: "",
    };
    return next();
  } catch (error) {
    return next({
      message:
        error.message || "An error occurred while submitting contact us form.",
      status: 500,
    });
  }
};

const getHomeClientData = async (req, res, next) => {
  try {
    const gallery = await Gallery.find()
      .select("-__v -updatedAt -createdAt")
      .lean();

    const homeData = await Home.findOne();

    req.successResponse = {
      message: "Home slider data and gallery retrieved successfully.",
      data: { galleryData: gallery, mainSlider: homeData?.mainCorousel || [] },
    };

    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching home data.",
      status: 500,
    });
  }
};
module.exports = {
  refreshToken,
  getUser,
  getNavbar,
  getMasterData,
  getCategories,
  getL2Categories,
  getL3Categories,
  getProductsInL3,
  getProductById,
  getProductsInL1,
  getProductsInL2,
  getGalleryImages,
  getPublicHomeData,
  getTrendyProducts,
  getAccessories,
  addSubscription,
  getGlobalSearchOpt,
  createContactUs,
  getHomeClientData,
};
