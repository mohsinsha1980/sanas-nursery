const { v4: uuidv4 } = require("uuid");
const Product = require("../../models/Product");
const { STATUS, ORDER_MAX_WEIGHT } = require("../../lib/constants");
const { capitalize, calSellingPrice } = require("../../lib/util");
const fs = require("fs");
const { default: mongoose } = require("mongoose");

const getProducts = async (req, res, next) => {
  try {
    if (
      !req.query.hasOwnProperty("page") ||
      !req.query.hasOwnProperty("per_page")
    ) {
      next({ status: 400, message: "Pagination is required." });
    }
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const skip = (page - 1) * per_page;

    const { title, product_id, status } = req.query;
    let filter = { status: { $ne: STATUS.DELETED } };

    if (title) {
      filter.title = { $regex: title?.trim(), $options: "i" };
    }

    if (product_id) {
      filter.$or = [];
      if (mongoose.Types.ObjectId.isValid(product_id)) {
        filter.$or.push({ _id: new mongoose.Types.ObjectId(product_id) });
      }
      filter.$or.push({ productId: { $regex: product_id, $options: "i" } });
    }

    if (status && (status === "0" || status === "1")) {
      filter.status = status;
    }

    const products = await Product.find(filter)
      .limit(per_page)
      .skip(skip)
      .select("title productId status category pictures")
      .populate([
        { path: "l1_category", select: "label -_id" },
        { path: "l2_category", select: "label -_id" },
        { path: "l3_category", select: "label -_id" },
      ])
      .sort("createdAt")
      .lean()
      .exec();

    const totalCount = await Product.countDocuments(filter);

    req.successResponse = {
      message: "Products retrieved successfully.",
      data: { products, totalCount },
    };

    return next();
  } catch (error) {
    return next({
      status: 500,
      message:
        error.message || "Internal server error while fetching Products.",
    });
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return next({ status: 400, message: "Product ID is required" });
    }

    const product = await Product.findOne({
      productId,
      status: { $ne: STATUS.DELETED },
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    if (!product) {
      return next({ status: 404, message: "Product not found" });
    }

    product.variants =
      product?.variants?.map((variant) => ({
        ...variant,
        material: variant.material.map((value) => ({
          label: capitalize(value),
          value,
        })),
        style: variant.style.map((value) => ({
          label: capitalize(value),
          value,
        })),
      })) || [];

    req.successResponse = {
      message: "Product retrieved successfully.",
      data: product,
    };

    return next();
  } catch (error) {
    return next({ status: 500, message: "Server error" });
  }
};

const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      slug,
      l1_category,
      l2_category,
      l3_category,
      taxRate,
      weight,
      length,
      width,
      height,
      details,
      status,
      metaDescription,
      summary,
      description,
      hsnNumber,
    } = req.body;

    let variants = req.body.variants ? JSON.parse(req.body.variants) : null;
    let sizeChart = req.body.sizeChart ? JSON.parse(req.body.sizeChart) : null;

    if (
      !title ||
      !slug ||
      !l1_category ||
      !l2_category ||
      !details ||
      taxRate === null ||
      taxRate === undefined ||
      !variants.length ||
      !weight ||
      !length ||
      !width ||
      !height ||
      !status ||
      !summary ||
      !description
    ) {
      return next({ status: 400, message: "Missing required fields." });
    }
    if (
      (Number(weight) || 0) / 1000 > ORDER_MAX_WEIGHT ||
      ((Number(length) || 0) * (Number(width) || 0) * (Number(height) || 0)) /
        5000 >
        ORDER_MAX_WEIGHT
    ) {
      return next({
        status: 400,
        message: "The product size is too large. It cannot be added.",
      });
    }

    if (Number(length) === 1 && Number(width) === 1 && Number(height) === 1) {
      return next({
        status: 400,
        message: "All dimensions cannot be 1 cm. Only one of them can be 1 cm",
      });
    }

    let productId = uuidv4();
    let existingProductId = await Product.findOne({ productId });

    while (existingProductId) {
      productId = uuidv4();
      existingProductId = await Product.findOne({ productId });
    }
    const dimensions = {
      weight,
      length,
      width,
      height,
    };

    variants = variants.map((variant) => ({
      ...variant,
      material: variant.material.length
        ? variant.material.map((m) => m.value)
        : [],
      style: variant.style.length ? variant.style.map((s) => s.value) : [],
      mrp: variant.mrp ? variant.mrp : 0,
      sellingPrice: calSellingPrice(variant.mrp || 0, variant.discount || 0),
    }));

    const product = new Product({
      productId,
      title,
      slug,
      l1_category,
      l2_category,
      l3_category: l3_category || null,
      pictures: req.optimizedImagePaths || [],
      details,
      taxRate,
      variants,
      dimensions,
      status,
      metaDescription: metaDescription || "",
      summary,
      description,
      sizeChart: sizeChart.length ? sizeChart : [],
      hsnNumber: hsnNumber || "",
    });

    const newProduct = await product.save();

    req.successResponse = {
      message: "Product added successfully.",
      data: newProduct,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error while creating Product.",
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return next({ message: "Product ID is required.", status: 400 });
    }

    const {
      title,
      slug,
      l1_category,
      l2_category,
      l3_category,
      taxRate,
      weight,
      length,
      width,
      height,
      details,
      status,
      metaDescription,
      summary,
      description,
      hsnNumber,
    } = req.body;

    let variants = req.body.variants ? JSON.parse(req.body.variants) : null;
    let sizeChart = req.body.sizeChart ? JSON.parse(req.body.sizeChart) : null;

    if (
      !title ||
      !slug ||
      !l1_category ||
      !l2_category ||
      !details ||
      taxRate === null ||
      taxRate === undefined ||
      !variants.length ||
      !weight ||
      !length ||
      !width ||
      !height ||
      !status ||
      !summary ||
      !description
    ) {
      return next({ status: 400, message: "Missing required fields." });
    }
    if (
      (Number(weight) || 0) / 1000 > ORDER_MAX_WEIGHT ||
      ((Number(length) || 0) * (Number(width) || 0) * (Number(height) || 0)) /
        5000 >
        ORDER_MAX_WEIGHT
    ) {
      return next({
        status: 400,
        message: "The product size is too large. It cannot be added.",
      });
    }

    if (Number(length) === 1 && Number(width) === 1 && Number(height) === 1) {
      return next({
        status: 400,
        message: "All dimensions cannot be 1 cm. Only one of them can be 1 cm",
      });
    }

    const dimensions = {
      weight,
      length,
      width,
      height,
    };

    variants = variants.map((variant) => ({
      ...variant,
      material: variant.material.length
        ? variant.material.map((m) => m.value)
        : [],
      style: variant.style.length ? variant.style.map((s) => s.value) : [],
      mrp: variant.mrp ? variant.mrp : 0,
      sellingPrice: calSellingPrice(variant.mrp || 0, variant.discount || 0),
    }));

    const inValidate = variants.find(
      (variant) => variant.quantity < variant.soldQuantity
    );

    if (inValidate) {
      return next({
        status: 400,
        message: "Total quantity should be greater than Sold quantity.",
      });
    }

    const changedData = {
      title,
      slug,
      l1_category,
      l2_category,
      l3_category: l3_category || null,
      details,
      taxRate,
      variants,
      dimensions,
      status,
      metaDescription: metaDescription || "",
      summary,
      description,
      sizeChart: sizeChart.length ? sizeChart : [],
      hsnNumber: hsnNumber || "",
    };

    if (req.optimizedImagePaths && req.optimizedImagePaths.length) {
      try {
        changedData.pictures = req.optimizedImagePaths;
        const oldProduct = await Product.findOne({
          productId,
        });

        if (oldProduct.pictures && oldProduct.pictures.length) {
          oldProduct.pictures.forEach((picture) => {
            fs.unlinkSync(picture);
          });
        }
      } catch (error) {
        if (error.code !== "ENOENT") {
          // ENOENT: no such file or directory
          return next({ status: 500, message: "Internal Server Error" });
        }
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { productId },
      changedData,
      {
        new: true,
      }
    );

    req.successResponse = {
      message: "Product updated successfully.",
      data: newProduct,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error while updating Product.",
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return next({ message: "Product ID is required.", status: 400 });
    }

    const product = await Product.findOneAndUpdate(
      { productId },
      { status: STATUS.DELETED },
      { new: true }
    );

    if (!product) {
      return next({
        message: "No product found with the provided Product ID.",
        status: 400,
      });
    }

    if (product.pictures?.length) {
      product.pictures.forEach((picture) => {
        fs.unlinkSync(picture);
      });
    }

    req.successResponse = {
      message: "Product deleted successfully!",
      data: product,
    };
    return next();
  } catch (error) {
    return next({
      message:
        error.message || "Internal Server Error while deleting category.",
      status: 500,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
