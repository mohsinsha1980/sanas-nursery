const Razorpay = require("razorpay");
const { ORDER_TAB_TYPE, ORDER_STATUS } = require("../../lib/constants");
const Order = require("../../models/Order");
const Refund = require("../../models/Refund");
const User = require("../../models/User");
const { readHTMLFile, getFormattedDateAndTime } = require("../../lib/util");
const handlebars = require("handlebars");
const path = require("path");
const { generateInvoice } = require("../user/checkout");
const fs = require("fs");
const mailClient = require("../../config/mailConfig");

const razorpay = new Razorpay({
  key_id: process.env.RAZORRPAY_KEY_ID,
  key_secret: process.env.RAZORRPAY_KEY_SECRET,
});

const getOrders = async (req, res, next) => {
  try {
    if (
      !req.query.hasOwnProperty("page") ||
      !req.query.hasOwnProperty("per_page")
    ) {
      return next({ status: 400, message: "Pagination is required." });
    }

    const page = parseInt(req.query.page);
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const skip = (page - 1) * per_page;
    const { order_type, order_date, order_id, status } = req.query;

    if (
      !order_type ||
      (order_type !== ORDER_TAB_TYPE.COMPLETED &&
        order_type !== ORDER_TAB_TYPE.INCOMPLETED)
    ) {
      return next({ status: 400, message: "Valid Orders Type is required." });
    }

    let filter = {};

    if (order_type === ORDER_TAB_TYPE.COMPLETED) {
      filter = {
        currentStatus: {
          $in: [ORDER_STATUS.DELIVERED, ORDER_STATUS.REFUNDED],
        },
      };
    } else {
      filter = {
        currentStatus: {
          $nin: [ORDER_STATUS.DELIVERED, ORDER_STATUS.REFUNDED],
        },
      };
    }

    if (order_date) {
      const startOfDay = new Date(order_date).setHours(0, 0, 0, 0);
      const endOfDay = new Date(order_date).setHours(23, 59, 59, 999);
      filter.orderDate = {
        $gte: new Date(startOfDay).toISOString(),
        $lt: new Date(endOfDay).toISOString(),
      };
    }

    if (order_id) {
      filter.orderId = { "$regex": order_id, "$options": "i" };
    }

    if (status) {
      filter.currentStatus = status;
    }

    const total = await Order.countDocuments(filter);
    const orders = await Order.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(per_page)
      .populate(
        "userId",
        "_id phone first_name last_name email is_verified active"
      )
      .populate(
        "shiprocketId",
        "shiprocket_orderId shipment_id awb_code courier_company_id courier_name delivery_charges pickup"
      )
      .populate("orderItems.productId", "picture")
      .select("-__v -updatedAt")
      .exec();
    req.successResponse = {
      message: "Orders retrieved successfully.",
      data: { orders, total },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
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

const cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return next({ status: 400, message: "Order ID is required" });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return next({ status: 404, message: "Order not found" });
    }

    if (
      order.currentStatus === ORDER_STATUS.DELIVERED ||
      order.currentStatus === ORDER_STATUS.REFUNDED
    ) {
      return next({
        status: 404,
        message: "No action allowed for this order.",
      });
    }

    order.currentStatus = ORDER_STATUS.CANCELED;
    order.orderStatuses.push({
      status: ORDER_STATUS.CANCELED,
      date: new Date().toISOString(),
    });

    await order.save();
    req.successResponse = {
      message: "Order canceled successfully.",
      data: "",
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

const refundOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      return next({ status: 400, message: "Order ID is required" });
    }

    const order = await Order.findOne({ orderId });
    if (!order) {
      return next({ status: 404, message: "Order not found" });
    }

    if (
      order.currentStatus === ORDER_STATUS.DELIVERED ||
      order.currentStatus === ORDER_STATUS.REFUNDED
    ) {
      return next({
        status: 404,
        message: "No action allowed for this order.",
      });
    }
    const paymentId = order.paymentId;
    if (!paymentId) {
      return next({
        status: 404,
        message: "No payment Id found for this order.",
      });
    }

    const refundObj = await razorpay.payments.refund(paymentId, {
      amount: order.priceData.effectivePrice * 100, // Full Refund including shipping charge.
      speed: "normal",
      notes: {
        adminId: req.userData?._id,
        phone: req.userData?.phone,
        orderId,
      },
      receipt: "refund_" + new Date() + orderId,
    });

    if (!refundObj || refundObj?.status !== "processed") {
      return next({
        status: 500,
        message: "Could not process the refund. try again!",
      });
    }

    order.currentStatus = ORDER_STATUS.REFUNDED;
    order.orderStatuses.push({
      status: ORDER_STATUS.REFUNDED,
      date: new Date().toISOString(),
    });

    await order.save();
    await Refund.create({
      refundId: refundObj.id,
      orderId: order.orderId,
      amount: refundObj.amount / 100,
      date: new Date().toISOString(),
      status: refundObj.status,
      speedProcessed: refundObj.speed_processed,
      notes: {
        adminId: req.userData._id,
        phone: req.userData.phone,
      },
    });

    req.successResponse = {
      message: "Order refunded successfully.",
      data: "",
    };
    return next();
  } catch (error) {
    let message = "";
    if (error?.error?.description) {
      message = error?.error?.description;
    }
    return next({
      message: message || error.message,
      status: 500,
    });
  }
};

const orderDeliveredEmailToUser = async (userId, orderId) => {
  const user = await User.findById(userId).lean();

  if (!user.email) {
    return;
  }

  readHTMLFile(
    path.join(__dirname + "/../../templates/order-delivered-user.html"),
    async function (readFileErr, html) {
      const template = handlebars.compile(html);
      const replacements = {
        name:
          `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
          user.email,
        orderId,
        shopLink: process.env.FRONTEND_HOME,
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
                address: user.email,
                name: "Info",
              },
            },
          ],
          subject: "TrendyThreads: Order Delivered",
          htmlbody: htmlToSend,
        });
      } catch (err) {
        if (err) {
          log({
            level: "error",
            user: userId,
            url: "orderDeliveredEmailToUser",
            message: err.message,
          });
        }
        return;
      }
    }
  );
};

const orderDeliveredEmailToAdmin = async (emailData) => {
  readHTMLFile(
    path.join(__dirname + "/../../templates/order-delivered-admin.html"),
    async function (readFileErr, html) {
      const template = handlebars.compile(html);
      const replacements = {
        orderId: emailData.orderId,
        customerPhone: emailData.userPhone,
        customerEmail: emailData.customerEmail,
        adminDashboardLink: process.env.FRONTEND_ADMIN_DASHBOARD,
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
          subject: "TrendyThreads: Order Delivered.",
          htmlbody: htmlToSend,
        });
      } catch (err) {
        if (err) {
          log({
            level: "error",
            user: emailData.userId,
            url: "orderDeliveryEmailToAdmin",
            message: err.message,
          });
          return;
        }
      }
    }
  );
};

const downloadBill = async (req, res, next) => {
  try {
    const { order_id } = req.params;
    if (!order_id)
      return next({ status: 401, message: "Order Id is required" });

    const filePath = path.join(__dirname, `../../invoice/${order_id}.pdf`);

    if (!fs.existsSync(filePath)) {
      const generatedFilepath = await generateInvoice(order_id);
      return res.sendFile(generatedFilepath);
    }

    return res.sendFile(filePath);
  } catch (e) {
    return next({ status: 500, message: e.message });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  cancelOrder,
  refundOrder,
  downloadBill,
  orderDeliveredEmailToUser,
  orderDeliveredEmailToAdmin,
};
