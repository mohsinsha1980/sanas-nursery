import fs, { existsSync } from "fs";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { STATUS } from "../../lib/constants.js";
import { generateSlug, invalidSlug } from "../../lib/util.js";
import Plant from "../../models/Plant.js";

export const getPlants = async (req, res, next) => {
  try {
    if (!("page" in req.query) || !("per_page" in req.query)) {
      return next({ status: 400, message: "Pagination is required." });
    }
    const page = parseInt(req.query.page);
    const per_page = req.query.per_page ? parseInt(req.query.per_page) : 10;
    const skip = (page - 1) * per_page;

    const { title, plant_id, status } = req.query;
    let filter = { status: { $ne: STATUS.DELETED } };

    if (title) {
      filter.title = { $regex: title?.trim(), $options: "i" };
    }

    if (plant_id) {
      filter.$or = [];
      if (mongoose.Types.ObjectId.isValid(plant_id)) {
        filter.$or.push({ _id: new mongoose.Types.ObjectId(plant_id) });
      }
      filter.$or.push({ plantId: { $regex: plant_id, $options: "i" } });
    }

    if (status && (status === "0" || status === "1")) {
      filter.status = status;
    }

    const plants = await Plant.find(filter)
      .limit(per_page)
      .skip(skip)
      .select("title plantId status category pictures")
      .sort("createdAt")
      .lean()
      .exec();

    const totalCount = await Plant.countDocuments(filter);

    req.successResponse = {
      message: "Plants retrieved successfully.",
      data: { plants, totalCount },
    };

    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error while fetching Plants.",
    });
  }
};

export const getPlantById = async (req, res, next) => {
  console.log("getPlantById");
  try {
    const { plantId } = req.params;

    if (!plantId) {
      return next({ status: 400, message: "Plant ID is required" });
    }

    const plant = await Plant.findOne({
      plantId,
      status: { $ne: STATUS.DELETED },
    })
      .select("-__v -updatedAt -createdAt")
      .lean()
      .exec();

    if (!plant) {
      return next({ status: 404, message: "Plant not found" });
    }

    req.successResponse = {
      message: "Plant retrieved successfully.",
      data: plant,
    };

    return next();
  } catch (error) {
    return next({ status: 500, message: "Server error" });
  }
};

export const createPlant = async (req, res, next) => {
  try {
    const {
      title,
      summary,
      category,
      size,
      careLevel,
      metaDescription,
      details,
      description,
      status,
    } = req.body;

    let specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : [];

    let faqs = req.body.faqs ? JSON.parse(req.body.faqs) : [];
    let tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    if (!title || !summary || !category || !size || !details || !description) {
      return next({ status: 400, message: "Missing required fields." });
    }

    const slug = generateSlug(title);
    if (invalidSlug(slug)) {
      return next({ message: invalidSlug(slug), status: 400 });
    }

    let plantId = uuidv4();
    let existingPlantId = await Plant.findOne({ plantId });
    while (existingPlantId) {
      plantId = uuidv4();
      existingPlantId = await Plant.findOne({ plantId });
    }

    if (!req.optimizedImagePaths?.length) {
      return next({ status: 400, message: "At least one image is required." });
    }

    const plant = new Plant({
      plantId,
      title,
      slug,
      summary,
      category,
      size,
      careLevel: careLevel || "",
      tags: tags.length ? tags : [],
      metaDescription: metaDescription || "",
      details,
      description,
      specifications: specifications.length ? specifications : [],
      faqs: faqs.length ? faqs : [],
      pictures: req.optimizedImagePaths,
      status: status === STATUS.ACTIVE ? STATUS.ACTIVE : STATUS.INACTIVE,
    });

    const newPlant = await plant.save();

    req.successResponse = {
      message: "Plant added successfully.",
      data: newPlant,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error while creating Plant.",
    });
  }
};

export const updatePlant = async (req, res, next) => {
  try {
    console.log("updatePlant");
    const { plantId } = req.params;
    if (!plantId) {
      return next({ message: "Plant ID is required.", status: 400 });
    }

    const {
      title,
      summary,
      category,
      size,
      careLevel,
      metaDescription,
      details,
      description,
      status,
    } = req.body;

    let specifications = req.body.specifications
      ? JSON.parse(req.body.specifications)
      : [];
    let faqs = req.body.faqs ? JSON.parse(req.body.faqs) : [];
    let tags = req.body.tags ? JSON.parse(req.body.tags) : [];

    if (!title || !summary || !category || !size || !details || !description) {
      return next({ status: 400, message: "Missing required fields." });
    }

    const slug = generateSlug(title);
    if (invalidSlug(slug)) {
      return next({ message: invalidSlug(slug), status: 400 });
    }

    const changedData = {
      plantId,
      title,
      slug,
      summary,
      category,
      size,
      careLevel: careLevel || "",
      tags: tags.length ? tags : [],
      metaDescription: metaDescription || "",
      details,
      description,
      specifications: specifications.length ? specifications : [],
      faqs: faqs.length ? faqs : [],
      status: status === STATUS.ACTIVE ? STATUS.ACTIVE : STATUS.INACTIVE,
    };

    if (req.optimizedImagePaths && req.optimizedImagePaths.length) {
      try {
        changedData.pictures = req.optimizedImagePaths;
        const oldPlant = await Plant.findOne({
          plantId,
        });

        if (oldPlant.pictures && oldPlant.pictures.length) {
          oldPlant.pictures.forEach((picture) => {
            if (existsSync(picture)) {
              unlinkSync(picture);
            }
          });
        }
      } catch (error) {
        if (error.code !== "ENOENT") {
          // ENOENT: no such file or directory
          return next({ status: 500, message: "Internal Server Error" });
        }
      }
    }

    const newPlant = await Plant.findOneAndUpdate({ plantId }, changedData, {
      new: true,
    });

    req.successResponse = {
      message: "Plant updated successfully.",
      data: newPlant,
    };
    return next();
  } catch (error) {
    return next({
      status: 500,
      message: error.message || "Internal server error while updating Plant.",
    });
  }
};

export const deletePlant = async (req, res, next) => {
  try {
    const { plantId } = req.params;
    if (!plantId) {
      return next({ message: "Plant ID is required.", status: 400 });
    }

    const plant = await Plant.findOneAndUpdate(
      { plantId },
      { status: STATUS.DELETED },
      { new: true }
    );

    if (!plant) {
      return next({
        message: "No plant found with the provided Plant ID.",
        status: 400,
      });
    }

    if (plant.pictures?.length) {
      plant.pictures.forEach((picture) => {
        fs.unlinkSync(picture);
      });
    }

    req.successResponse = {
      message: "Plant deleted successfully!",
      data: plant,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "Internal Server Error while deleting plant.",
      status: 500,
    });
  }
};

export const getPlantsForGreenChoices = async (req, res, next) => {
  try {
    console.log("getPlantsForGreenChoices");
    let filter = { status: STATUS.ACTIVE };
    const plants = await Plant.find(filter)
      .select("title plantId category pictures")
      .sort("createdAt")
      .lean()
      .exec();

    req.successResponse = {
      message: "Plants retrieved successfully.",
      plants,
    };

    return next();
  } catch (error) {
    console.log("error ", error);
    return next({
      status: 500,
      message: error.message || "Internal server error while fetching Plants.",
    });
  }
};
