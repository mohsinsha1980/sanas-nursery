import { ENQUIRY_STATUS } from "../../lib/constants.js";
import { ContactUs } from "../../models/ContactUs.js";
import { OrderEnquiry } from "../../models/OrderEnquiry.js";

export const getDashboardStats = async (req, res, next) => {
  try {
    const orderEnquiryStats = await getEnquiryStats(OrderEnquiry);
    const contactEnquiryStats = await getEnquiryStats(ContactUs);

    const stats = {
      orderEnquiries: orderEnquiryStats,
      contactEnquiries: contactEnquiryStats,
    };

    req.successResponse = {
      message: "Dashboard statistics retrieved successfully.",
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

const getEnquiryStats = async (Model) => {
  try {
    const total = await Model.countDocuments();
    const pending = await Model.countDocuments({
      status: ENQUIRY_STATUS.PENDING,
    });
    const contacted = await Model.countDocuments({
      status: ENQUIRY_STATUS.CONTACTED,
    });
    const resolved = await Model.countDocuments({
      status: ENQUIRY_STATUS.RESOLVED,
    });
    const closed = await Model.countDocuments({
      status: ENQUIRY_STATUS.CLOSED,
    });

    return {
      total,
      pending,
      contacted,
      resolved,
      closed,
    };
  } catch (error) {
    throw new Error(`Error getting enquiry stats: ${error.message}`);
  }
};
