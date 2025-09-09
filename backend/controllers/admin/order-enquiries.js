import { ENQUIRY_STATUS } from "../../lib/constants.js";
import { OrderEnquiry } from "../../models/OrderEnquiry.js";

export const getCompOrderEnquiries = async (req, res, next) => {
  try {
    console.log("getCompOrderEnquiries");
    if (!("page" in req.query) || !("per_page" in req.query)) {
      return next({ status: 400, message: "Pagination is required." });
    }
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const skip = (page - 1) * per_page;

    let filter = {
      status: { $in: [ENQUIRY_STATUS.CLOSED, ENQUIRY_STATUS.RESOLVED] },
    };

    console.log("skip,skip", skip);
    const total = await OrderEnquiry.countDocuments(filter);
    const enquiries = await OrderEnquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(per_page)
      .populate("plantId", "title picture")
      .select("-__v")
      .exec();

    req.successResponse = {
      message: "Order enquiries retrieved successfully.",
      data: { enquiries, total },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const getInCompOrderEnquiries = async (req, res, next) => {
  try {
    if (!("page" in req.query) || !("per_page" in req.query)) {
      return next({ status: 400, message: "Pagination is required." });
    }
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const skip = (page - 1) * per_page;

    const { status } = req.query;
    let filter = {};

    if (
      status === ENQUIRY_STATUS.PENDING ||
      status === ENQUIRY_STATUS.CONTACTED
    ) {
      filter.status = status;
    } else {
      filter.status = {
        $in: [ENQUIRY_STATUS.PENDING, ENQUIRY_STATUS.CONTACTED],
      };
    }

    const total = await OrderEnquiry.countDocuments(filter);
    const enquiries = await OrderEnquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(per_page)
      .populate("plantId", "title pictures")
      .populate("userId", "first_name last_name email phone")
      .select("-__v")
      .exec();

    req.successResponse = {
      message: "Order enquiries retrieved successfully.",
      data: { enquiries, total },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};

export const updateOrderEnquiryStatus = async (req, res, next) => {
  try {
    const { enquiryId } = req.params;
    const { status } = req.body;

    if (!enquiryId) {
      return next({ status: 400, message: "Enquiry ID is required" });
    }

    if (!status || !Object.values(ENQUIRY_STATUS).includes(status)) {
      return next({ status: 400, message: "Valid status is required" });
    }

    const enquiry = await OrderEnquiry.findById(enquiryId);
    if (!enquiry) {
      return next({ status: 404, message: "Order enquiry not found" });
    }

    enquiry.status = status;
    await enquiry.save();

    req.successResponse = {
      message: "Order enquiry status updated successfully.",
      data: enquiry,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message,
      status: 500,
    });
  }
};
