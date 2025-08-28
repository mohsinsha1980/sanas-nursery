import User from "../../models/User.js";

export const getUsers = async (req, res, next) => {
  try {
    if (!req.query.page || !req.query.per_page) {
      return next({ status: 400, message: "Pagination is required." });
    }
    
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const skip = (page - 1) * per_page;

    const users = await User.find()
      .limit(per_page)
      .skip(skip)
      .select("name phone isVerified email role")
      .sort("createdAt")
      .lean()
      .exec();

    const totalCount = await User.countDocuments();

    req.successResponse = {
      message: "Users retrieved successfully.",
      data: { users, totalCount },
    };

    return next();
  } catch (e) {
    console.log("e", e, req.query);
    return next({
      status: 500,
      message: e.message || "Internal server error while fetching users.",
    });
  }
};
