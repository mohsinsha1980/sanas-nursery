const Subscription = require("../../models/Subscription");

const getSubscription = async (req, res, next) => {
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

    const subscribed = await Subscription.find()
      .limit(per_page)
      .skip(skip)
      .sort("createdAt")
      .lean()
      .exec();

    const total = await Subscription.countDocuments();
    req.successResponse = {
      message: "Subscribers retrieved successfully",
      data: { subscribed, total },
    };
    return next();
  } catch (e) {
    return next({
      status: 500,
      message:
        error.message || "Internal server error while fetching Subscribers.",
    });
  }
};

module.exports = {
  getSubscription,
};
