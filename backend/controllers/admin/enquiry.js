const Enquiry = require("../../models/ContactUs");

const getEnquiry = async (req, res, next) => {
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

    const enquiry = await Enquiry.find()
      .limit(per_page)
      .skip(skip)
      .select("_id full_name email phone message pictures file createdAt")
      .sort("-createdAt")
      .lean()
      .exec();

    const totalCount = await Enquiry.countDocuments();

    req.successResponse = {
      message: "Enquiry retrieved successfully.",
      data: { enquiry, totalCount },
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message:
        e.message || "Internal server error while fetching Enquiry.",
    });
  }
};

module.exports = {
    getEnquiry,
};