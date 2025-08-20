const {
  STATUS,
  ORDER_STATUS,
  TOP_SELLING_PRODUCT_COUNT,
} = require("../../lib/constants");
const Order = require("../../models/Order");
const Product = require("../../models/Product");

const getDashboardStats = async (req, res, next) => {
  try {
    const startOfDay = new Date().setHours(0, 0, 0, 0);
    const endOfDay = new Date().setHours(23, 59, 59, 999);

    const ordersToday = await Order.find({
      orderDate: {
        $gte: new Date(startOfDay).toISOString(),
        $lt: new Date(endOfDay).toISOString(),
      },
    });

    const ordersExpectedTobeDeliveredToday = await Order.find({
      estimateDeliveryDate: {
        $gte: new Date(startOfDay).toISOString(),
        $lt: new Date(endOfDay).toISOString(),
      },
    });

    const deliveredTodayAsExpected = ordersExpectedTobeDeliveredToday.filter(
      (order) => order.orderStatus === ORDER_STATUS.DELIVERED
    );

    const now = new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).setHours(0, 0, 0, 0);

    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const ordersThisMonth = await Order.find({
      orderDate: {
        $gte: new Date(startOfMonth).toISOString(),
        $lt: new Date(endOfMonth).toISOString(),
      },
    });

    const totalOrdersInCurrentMonth = ordersThisMonth.length;
    const totalRevenueInCurrentMonth = ordersThisMonth.reduce(
      (sum, order) => sum + order.priceData.effectivePrice,
      0
    );

    const stats = {
      ordersToday: {
        count: ordersToday.length,
        revenue: parseFloat(
          ordersToday
            .reduce((sum, order) => sum + order.priceData.effectivePrice, 0)
            .toFixed(2)
        ),
      },
      deliveredAsExpected: deliveredTodayAsExpected.length,
      pendingAsExpected:
        ordersExpectedTobeDeliveredToday.length -
        deliveredTodayAsExpected.length,

      ordersInCurrentMonth: {
        count: totalOrdersInCurrentMonth,
        revenue: parseFloat(totalRevenueInCurrentMonth.toFixed(2)),
      },
    };

    req.successResponse = {
      message: "Dashboard stats retrieved successfully!",
      data: stats,
    };

    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

const getOrdersStats = async (req, res, next) => {
  try {
    let { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return next({
        status: 400,
        message: "Start date and end date are required",
      });
    }

    startDate = new Date(startDate).setHours(0, 0, 0, 0);
    endDate = new Date(endDate).setHours(23, 59, 59, 999);

    const orders = await Order.find({
      orderDate: {
        $gte: new Date(startDate).toISOString(),
        $lt: new Date(endDate).toISOString(),
      },
    });

    // club orders by date
    const ordersByDate = orders.reduce((acc, order) => {
      let date = new Date(order.orderDate).setHours(0, 0, 0, 0);
      date = new Date(date).toISOString();
      if (!acc[date]) {
        acc[date] = {
          orderDate: date,
          totalRevenue: 0,
          OrdersCount: 0,
        };
      }
      acc[date].totalRevenue += order.priceData.effectivePrice;
      acc[date].OrdersCount += 1;
      return acc;
    }, {});

    let result = Object.values(ordersByDate).sort(
      (a, b) => new Date(a.orderDate) - new Date(b.orderDate)
    );

    result = result.map((item) => ({
      ...item,
      totalRevenue: parseFloat(item.totalRevenue.toFixed(2)),
      orderDate: new Date(item.orderDate),
    }));

    req.successResponse = {
      message: "orders stats retrieved successfully!",
      data: result,
    };

    return next();
  } catch (err) {
    return next({
      message: err.message,
      status: 500,
    });
  }
};

const topSellingProducts = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    if (!startDate || !endDate) {
      return next({ status: 400, error: "Start and end dates are required." });
    }

    const start = new Date(startDate).setHours(0, 0, 0, 0);
    const end = new Date(endDate).setHours(23, 59, 59, 999);

    if (start > end) {
      return next({
        status: 400,
        error: "Start date must be before end date.",
      });
    }

    const orders = await Order.find({
      orderDate: {
        $gte: new Date(start).toISOString(),
        $lt: new Date(end).toISOString(),
      },
    })
      .populate({
        path: "orderItems.productId",
        select: "_id title",
      })
      .exec();

    const productRevenueMap = {};

    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        const productId = item.productId._id;
        if (!productRevenueMap[productId]) {
          productRevenueMap[productId] = {
            productId: productId,
            title: item.productId.title,
            revenue: 0,
            countSold: 0,
          };
        }
        productRevenueMap[productId].revenue += item.totalAmount;
        productRevenueMap[productId].countSold += item.quantity;
      });
    });

    const topProducts = Object.values(productRevenueMap).slice(
      0,
      TOP_SELLING_PRODUCT_COUNT
    );

    req.successResponse = {
      message: `Top ${TOP_SELLING_PRODUCT_COUNT} revenue-generating products retrieved successfully!`,
      data: topProducts,
    };

    return next();
  } catch (err) {
    return next({ status: 500, error: err.message });
  }
};

const getInventoryReport = async (req, res, next) => {
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

    const products = await Product.find({ status: { $ne: STATUS.DELETED } })
      .limit(per_page)
      .skip(skip)
      .select("productId title variants pictures")
      .lean()
      .exec();

    const inventoryReport = products.map((product) => ({
      productId: product.productId,
      title: product.title,
      picture: product.pictures[0],
      variants: product.variants.map((variant) => ({
        _id: variant._id,
        color: variant.color,
        size: variant.size,
        availableQuantity: variant.quantity - variant.soldQuantity,
        soldQuantity: variant.soldQuantity,
        sellingPrice: variant.sellingPrice,
      })),
    }));

    const total = await Product.countDocuments({
      status: { $ne: STATUS.DELETED },
    });

    req.successResponse = {
      message: "Inventory Report retrieved successfully!",
      data: { inventoryReport, total },
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getOrdersStats,
  topSellingProducts,
  getInventoryReport,
};
