import fs from "fs";
import {
  GREEN_CHOICES_PRODUCT_LIMIT,
  YT_VIDEOS_LENGTH,
} from "../../lib/constants.js";
import Home from "../../models/Home.js";

export const getHomeData = async (req, res, next) => {
  try {
    const homeData = await Home.findOne({})
      .populate({
        path: "greenChoices",
        select: "_id title plantId category pictures",
      })
      .lean();

    req.successResponse = {
      message: "Home data retrieved successfully",
      data: homeData,
    };
    return next();
  } catch (e) {
    return next({ status: 500, message: "Internal server error." });
  }
};

export const updateGreenChoices = async (req, res, next) => {
  try {
    const greenChoices = req.body;

    if (!Array.isArray(greenChoices)) {
      return next({
        status: 400,
        message: "greenChoices must be an array of IDs",
      });
    }

    const homeData = await Home.findOneAndUpdate(
      {},
      {
        $set: {
          greenChoices:
            greenChoices.slice(0, GREEN_CHOICES_PRODUCT_LIMIT) || [],
        },
      },
      { new: true, upsert: true }
    ).populate({
      path: "greenChoices",
      select: "_id title plantId category pictures",
    });

    req.successResponse = {
      message: "Green choices updated successfully",
      data: homeData?.greenChoices,
    };
    return next();
  } catch (e) {
    return next({ status: 500, message: "Internal server error." });
  }
};

export const updateHomeCard = async (req, res, next) => {
  try {
    const { field, small, smallColor, large, largeColor, link, pictures } =
      req.body;
    const linkData = JSON.parse(link);

    if (
      !field ||
      !small ||
      !smallColor ||
      !large ||
      !largeColor ||
      !linkData?.label ||
      !linkData?.address ||
      !linkData?.color
    ) {
      return next({ message: "Missing required fields.", status: 400 });
    }

    let homeData = await Home.findOne({});
    const imagePath = req.optimizedImagePath;

    if (!homeData) {
      if (!req.optimizedImagePath) {
        return next({ message: "Picture is required.", status: 400 });
      }

      homeData = new Home({
        cards: {
          [field]: {
            small,
            smallColor,
            large,
            largeColor,
            link: linkData,
            picture: req.optimizedImagePath,
          },
        },
      });
    } else {
      if (!homeData["cards"]) {
        homeData["cards"] = {};
      }

      const data = {
        small,
        smallColor,
        large,
        largeColor,
        link: linkData,
        picture: pictures,
      };

      if (req.optimizedImagePath) {
        data.picture = req.optimizedImagePath;
        const existingImage = homeData["cards"][field]?.picture;
        if (existingImage) {
          fs.unlink(existingImage, (err) => {
            if (err) {
              return next({
                message: "Internal Server Error while deleting image.",
                status: 500,
              });
            }
          });
        }
      }

      homeData["cards"][field] = data;
    }

    await homeData.save();

    req.successResponse = {
      message: `${field} card updated successfully.`,
      data: homeData,
    };
    return next();
  } catch (error) {
    console.log(error);
    return next({ status: 500, message: "Internal server error." });
  }
};

export const updateHomeGallery = async (req, res, next) => {
  try {
    const { field } = req.body;

    if (!field || !req.optimizedImagePath) {
      return next({ message: "Missing field name or image.", status: 400 });
    }

    let homeData = await Home.findOne({});
    const imagePath = req.optimizedImagePath;

    if (!homeData) {
      homeData = new Home({
        gallery: {
          [field]: imagePath,
        },
      });
    } else {
      if (!homeData["gallery"]) {
        homeData["gallery"] = {};
      }

      const existingImage = homeData["gallery"][field];
      if (existingImage) {
        fs.unlink(existingImage, (err) => {
          if (err) {
            return next({
              message: "Internal Server Error while deleting image.",
              status: 500,
            });
          }
        });
      }
    }

    homeData["gallery"][field] = imagePath;
    await homeData.save();

    req.successResponse = {
      message: `Gallery image updated successfully.`,
      data: homeData,
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};

export const updateHomeVideos = async (req, res, next) => {
  try {
    const { videos } = req.body;
    if (
      !videos ||
      !Array.isArray(videos) ||
      videos.length != YT_VIDEOS_LENGTH
    ) {
      return next({
        message: `${YT_VIDEOS_LENGTH} videos are required, but received ${
          Array.isArray(videos) ? videos.length : 0
        }.`,
        status: 400,
      });
    }

    if (videos.some((v) => !v || String(v).trim() === "")) {
      return next({
        message: "valid videos are required.",
        status: 400,
      });
    }

    let homeData = await Home.findOne({});
    if (!homeData) {
      homeData = new Home({
        videos: videos,
      });
    }

    homeData["videos"] = videos;
    await homeData.save();

    req.successResponse = {
      message: `Videos updated successfully.`,
      data: homeData,
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};
