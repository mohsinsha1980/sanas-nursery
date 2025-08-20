const { generateInvoice } = require("./checkout");
const Order = require("../../models/Order");
const fs = require("fs");
const path = require("path");
const { constructProductLink } = require("../../lib/util");
const { STATUS } = require("../../lib/constants");

const downloadBill = async (req, res, next) => {
  try {
    const { order_id } = req.query;
    if (!order_id)
      return next({ status: 401, message: "Order Id is required" });

    const filePath = path.resolve(__dirname, `../../invoice/${order_id}.pdf`);

    if (!fs.existsSync(filePath)) {
      const generatedFilepath = await generateInvoice(order_id);

      if (!fs.existsSync(generatedFilepath)) {
        return next({ status: 500, message: "Invoice generation failed" });
      }

      return res.sendFile(generatedFilepath);
    }

    return res.sendFile(filePath);
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

const getUserOrders = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    if (
      !req.query.hasOwnProperty("page") ||
      !req.query.hasOwnProperty("per_page")
    ) {
      return next({ status: 400, message: "Pagination is required." });
    }
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const skip = (page - 1) * per_page;

    const totalOrders = await Order.countDocuments({ userId });

    const orders = await Order.find({ userId })
      .sort("-orderDate")
      .skip(skip)
      .limit(per_page)
      .populate({
        path: "orderItems.productId",
        model: "Product",
        select: "_id pictures title sellingPrice mrp discount l1_category l2_category l3_category slug status",
        populate: [
          { path: "l1_category", model: "Category", select: "label slug" },
          { path: "l2_category", model: "Category", select: "label slug" },
          { path: "l3_category", model: "Category", select: "label slug" },
        ]
      })
      .select("-__v -updatedAt")
      .lean()
      .exec();


    const updatedOrders = orders.map(order => ({
      ...order,
      orderItems: order.orderItems.map(item => ({
        ...item,
        productId: item.productId._id,
        link: item.productId?._id && item.productId?.status === STATUS.ACTIVE ? constructProductLink(item.productId) : "#",
      })),
    }));


    req.successResponse = {
      message: "Orders retrieved successfully!",
      data: {
        orders: updatedOrders,
        total: totalOrders,
      },
    };

    return next();
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return next({ status: 400, message: "Order ID is required" });
    }

    const order = await Order.findOne({ orderId })
      .populate(
        "userId",
        "_id phone first_name last_name email is_verified active"
      )
      .populate("shiprocketId")
      .lean()
      .exec();

    if (!order) {
      return next({ status: 404, message: "Order not found" });
    }
    req.successResponse = {
      message: "Order retrieved successfully.",
      data: order,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

module.exports = {
  downloadBill,
  getUserOrders,
  getOrderById,
};
