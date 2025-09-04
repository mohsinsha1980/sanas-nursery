import {
  CATEGORY_ARR,
  PLANTS_PER_PAGE,
  SIMILAR_PLANTS_COUNT,
  STATUS,
} from "../lib/constants.js";
import { buildPlantFilter } from "../lib/util.js";
import Plant from "../models/Plant.js";
import Settings from "../models/Settings.js";

export const getCatProducts = async (req, res, next) => {
  try {
    const { category_slug } = req.params;
    const { page } = req.query;

    if (!category_slug) {
      return next({
        message: "Category slug is required",
        status: 400,
      });
    }

    const validCategory = CATEGORY_ARR.find(
      (cat) => cat.value === category_slug
    );
    if (!validCategory) {
      return next({
        message: "Invalid category provided",
        status: 400,
      });
    }

    const skip = page && page > 0 ? (page - 1) * PLANTS_PER_PAGE : 0;
    const filter = await buildPlantFilter(req.query);

    const plantsTotal = await Plant.countDocuments({
      ...filter,
      status: STATUS.ACTIVE,
      category: category_slug,
    });

    console.log("filter ", filter, category_slug, skip);
    const plants = await Plant.find({
      ...filter,
      status: STATUS.ACTIVE,
      category: category_slug,
    })
      .select("-__v -updatedAt -createdAt")
      .skip(skip)
      .limit(PLANTS_PER_PAGE)
      .lean()
      .exec();

    console.log(plants);

    req.successResponse = {
      message: "Data retrieved successfully.",
      data: {
        plants: plants,
        total: plantsTotal,
      },
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "An error occurred while fetching plants.",
      status: 500,
    });
  }
};

export const getMasterData = async (req, res, next) => {
  try {
    const masterData = await Settings.findOne();

    const updatedData = masterData
      ? {
          tags: masterData.tags || [],
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

export const getPlantDetailsBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return next({
        message: "Plant slug is required",
        status: 400,
      });
    }

    const plant = await Plant.findOne({
      slug,
      status: STATUS.ACTIVE,
    })
      .select("-__v -updatedAt -createdAt")
      .lean();

    if (!plant) {
      return next({
        message: "Plant not found",
        status: 404,
      });
    }

    const similarPlants = await Plant.aggregate([
      {
        $match: {
          category: plant.category,
          slug: { $ne: slug },
          status: STATUS.ACTIVE,
        },
      },
      { $sample: { size: SIMILAR_PLANTS_COUNT } },
    ]);

    req.successResponse = {
      message: "Plant details retrieved successfully.",
      data: {
        plant,
        similarPlants,
      },
    };

    return next();
  } catch (error) {
    return next({
      message:
        error.message || "An error occurred while fetching plant details.",
      status: 500,
    });
  }
};

export const getPlantDetailsByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next({
        message: "Plant ID is required",
        status: 400,
      });
    }

    const plant = await Plant.findOne({
      _id: id,
      status: STATUS.ACTIVE,
    })
      .select("-__v -updatedAt -createdAt")
      .lean();

    if (!plant) {
      return next({
        message: "Plant not found",
        status: 404,
      });
    }

    const similarPlants = await Plant.aggregate([
      {
        $match: {
          category: plant.category,
          slug: { $ne: slug },
          status: STATUS.ACTIVE,
        },
      },
      { $sample: { size: SIMILAR_PLANTS_COUNT } },
    ]);

    req.successResponse = {
      message: "Plant details retrieved successfully.",
      data: {
        plant,
        similarPlants,
      },
    };
    return next();
  } catch (error) {
    return next({
      message:
        error.message || "An error occurred while fetching plant details.",
      status: 500,
    });
  }
};
