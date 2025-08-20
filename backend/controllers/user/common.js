const Support = require("../../models/Support");
const { emailRegex, phoneRegex } = require("../../lib/util");

const createSupport = async (req, res, next) => {
  try {
    const { issue, orderId, tnxID, phone, email, description } = req.body;

    if (!issue || !phone || !email || !description || !orderId) {
      return next({
        message:
          "Missing required fields: issue, phone, email, description, and order ID.",
        status: 400,
      });
    }

    if (!emailRegex.test(email) || !phoneRegex.test(phone)) {
      return next({ message: "Email or phone is invalid", status: 401 });
    }

    const newSupport = new Support({
      issue,
      phone,
      email,
      description,
      orderId: orderId.trim().toLowerCase(),
      tnxID: tnxID ? tnxID.trim().toLowerCase() : "",
    });

    const result = await newSupport.save();

    req.successResponse = {
      message: "Support form submitted successfully!",
      data: result,
    };

    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while submitting support.",
      status: 500,
    });
  }
};

module.exports = {
  createSupport,
};
