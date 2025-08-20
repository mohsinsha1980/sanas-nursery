const Users = require("../../models/User");

const getUsers = async (req, res, next) => {
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

    const users = await Users.find()
      .limit(per_page)
      .skip(skip)
      .select("first_name last_name addresses phone is_verified active email role")
      .sort("createdAt")
      .lean()
      .exec();

    const totalCount = await Users.countDocuments();

    req.successResponse = {
      message: "Users retrieved successfully.",
      data: { users, totalCount },
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message || "Internal server error while fetching users.",
    });
  }
};

const getUser = async (req, res) => {
  res.send("getUser");
};

const createUser = async (req, res) => {
  res.send("createUser");
};

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { active } = req.body;

    if (!id) {
      return res
        .status(404)
        .json({ error: true, message: "User ID not found." });
    }

    const updateUser = await Users.findByIdAndUpdate(
      id,
      { active },
      { new: true, runValidators: true }
    ).select(
      "first_name last_name is_verified active addresses _id phone email"
    );

    req.successResponse = {
      message: "User Details updated successfully.",
      data: updateUser,
    };

    return next();
  } catch (e) {
    return next({
      status: 500,
      message: e.message || "Internal server error while updating user.",
    });
  }
};

const deleteUser = async (req, res) => {
  res.send("deleteUser");
};

module.exports = {
  getUser,
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
