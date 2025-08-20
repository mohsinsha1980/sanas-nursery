const Support = require("../../models/Support");

const getSupport = async (req, res, next) => {
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

    const support = await Support.find()
      .limit(per_page)
      .skip(skip)
      .select("issue orderId phone phone description email status")
      .sort("-createdAt")
      .lean()
      .exec();

    const totalCount = await Support.countDocuments();

    req.successResponse = {
      message: "Support retrieved successfully.",
      data: { support, totalCount },
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message || "Internal server error while fetching Support.",
    });
  }
};

const updateSupport = async (req, res, next) => {
  try {
    const { supportId } = req.params;
    const { status } = req.body;

    if (!supportId) {
      return res
        .status(404)
        .json({ error: true, message: "Support ID not found." });
    }

    const updateSupport = await Support.findByIdAndUpdate(
      supportId,
      { status },
      { new: true, runValidators: true }
    );

    req.successResponse = {
      message: "Support updated successfully.",
      data: updateSupport,
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message:
        e.message || "Internal server error while updating Support Form.",
    });
  }
};

module.exports = {
  getSupport,
  updateSupport,
};
