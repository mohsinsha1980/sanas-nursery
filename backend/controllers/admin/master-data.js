import { MASTER_DATA_TYPE } from "../../lib/constants.js";
import MasterData from "../../models/Settings.js";

export const getMasterData = async (req, res, next) => {
  try {
    const masterData = await MasterData.findOne();

    const updatedData = masterData
      ? {
          tags: masterData.tags || [],
          blogTags: masterData.blogTags || [],
        }
      : {
          tags: [],
        };

    req.successResponse = {
      message: "MasterData retrieved successfully",
      data: updatedData,
    };

    return next();
  } catch (e) {
    return next({
      message: e.message || " An error occurred while fetching Master Data",
      status: 500,
    });
  }
};

export const addMasterData = async (req, res, next) => {
  try {
    const { field, data } = req.body;

    if (!field || !data) {
      return next({ status: 400, message: "Field and data are required." });
    }

    const validFields = Object.values(MASTER_DATA_TYPE);
    if (!validFields.includes(field)) {
      return next({ status: 400, message: "Invalid field provided." });
    }

    let masterData = await MasterData.findOne();

    if (!masterData) {
      const newMasterData = new MasterData({ [field]: data });
      await newMasterData.save();
      req.successResponse = {
        message: "MasterData created.",
        data: newMasterData,
      };
      return next();
    }

    let newData = null;

    if (Array.isArray(masterData[field])) {
      const isDuplicate = masterData[field].some((item) => {
        const isLabelDuplicate = item.label === data.label;
        const isValueDuplicate = item.value === data.value;
        return isLabelDuplicate || isValueDuplicate;
      });

      if (isDuplicate) {
        return next({
          status: 400,
          message: "Duplicate entry. The label or value already exists.",
        });
      }
      masterData[field] = [...masterData[field], data];
    }

    const master = await masterData.save();
    newData = master[field].find((field) => field.label === data.label);

    req.successResponse = {
      message: "MasterData updated.",
      data: newData,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error.",
    });
  }
};

export const deleteMasterRecord = async (req, res, next) => {
  try {
    const { field, id } = req.params;

    if (!field || !id) {
      return next({ status: 400, message: "Field name and id are required." });
    }

    const validFields = Object.values(MASTER_DATA_TYPE);
    if (!validFields.includes(field)) {
      return next({ status: 400, message: "Invalid field provided." });
    }

    let masterData = await MasterData.findOne();
    const recordIndex =
      masterData && Array.isArray(masterData[field])
        ? masterData[field].findIndex((record) => record._id.toString() === id)
        : null;

    if (!masterData || !masterData[field] || recordIndex === -1) {
      return next({
        status: 400,
        message: "Data not found.",
      });
    }

    const deletedRecord = masterData[field][recordIndex];
    masterData[field].splice(recordIndex, 1);
    await masterData.save();

    req.successResponse = {
      message: "Record deleted successfully.",
      data: deletedRecord,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error.",
    });
  }
};
