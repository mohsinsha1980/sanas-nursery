const { unlinkAsync } = require("../../lib/util");
const fs = require("fs");
const Home = require("../../models/Home");

const getHomeData = async (req, res, next) => {
  try {
    const homeData = await Home.findOne({});
    req.successResponse = {
      message: "Home data retrieved successfully",
      data: homeData,
    };
    return next();
  } catch (e) {
    return next({ status: 500, message: "Internal server error." });
  }
};

const updateHomeBanner = async (req, res, next) => {
  try {
    const { section, field, small, smallColor, large, largeColor, link } =
      req.body;
    const linkData = JSON.parse(link);

    if (
      !section ||
      !field ||
      !small ||
      !smallColor ||
      !large ||
      !largeColor ||
      !linkData?.label ||
      !linkData?.address ||
      !linkData?.color ||
      !req.optimizedImagePath
    ) {
      return next({ message: "Missing required fields.", status: 400 });
    }

    let homeData = await Home.findOne({});
    const imagePath = req.optimizedImagePath;

    if (!homeData) {
      homeData = new Home({
        [section]: {
          [field]: {
            small,
            smallColor,
            large,
            largeColor,
            link: linkData,
            picture: imagePath,
          },
        },
      });
    } else {
      if (!homeData[section]) {
        homeData[section] = {};
      }

      const existingImage = homeData[section][field]?.picture;
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

      homeData[section][field] = {
        small,
        smallColor,
        large,
        largeColor,
        link: linkData,
        picture: imagePath,
      };
    }

    await homeData.save();

    req.successResponse = {
      message: `${field} updated in ${section}.`,
      data: homeData,
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};

const addHomeSlide = async (req, res, next) => {
  try {
    const { h1, h1Color, h2, h2Color, h3, h3Color, link, status } = req.body;
    const linkData = JSON.parse(link);

    if (
      !h1 ||
      !h2 ||
      !h3 ||
      !linkData?.label ||
      !linkData?.address ||
      !req.optimizedImagePath
    ) {
      return next({ message: "Missing required fields.", status: 400 });
    }

    const newSlide = {
      h1,
      h1Color: h1Color || "",
      h2,
      h2Color: h2Color || "",
      h3,
      h3Color: h3Color || "",
      link: linkData,
      picture: req.optimizedImagePath,
      status: status ?? true,
    };

    let home = await Home.findOne();
    if (!home) {
      home = new Home({ mainCorousel: [newSlide] });
    } else {
      home.mainCorousel.push(newSlide);
    }

    const data = await home.save();
    req.successResponse = {
      message: "New slide added successfully!",
      data: data.mainCorousel,
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};

const deleteHomeSlide = async (req, res, next) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return next({ message: "Slide ID is required.", status: 400 });
    }

    const home = await Home.findOne();
    if (!home) {
      return next({ message: "Home document not found.", status: 404 });
    }

    const slideToDelete = home.mainCorousel.find(
      (slide) => slide._id.toString() === _id
    );

    if (!slideToDelete) {
      return next({ message: "Slide not found.", status: 404 });
    }

    home.mainCorousel = home.mainCorousel.filter(
      (slide) => slide._id.toString() !== _id
    );

    const data = await home.save();

    if (slideToDelete.picture) {
      fs.unlink(slideToDelete.picture, (err) => {
        if (err) {
          return next({
            message: "Internal Server Error while deleting image.",
            status: 500,
          });
        }
      });
    }

    req.successResponse = {
      message: "Slide deleted successfully!",
      data: data.mainCorousel,
    };
    return next();
  } catch (error) {
    return next({
      message: error.message || "Internal Server Error while deleting slide.",
      status: 500,
    });
  }
};

const updateHomeSlider = async (req, res, next) => {
  try {
    const {
      _id,
      h1,
      h1Color,
      h2,
      h2Color,
      h3,
      h3Color,
      link,
      status,
      pictures,
    } = req.body;
    const linkData = JSON.parse(link);

    if (!_id) {
      return next({ message: "Slide ID is required.", status: 400 });
    }

    if (!h1 || !h2 || !h3 || !linkData?.label || !linkData?.address) {
      return next({ message: "Missing required fields.", status: 400 });
    }

    const newSlideData = {
      h1,
      h1Color: h1Color || "",
      h2,
      h2Color: h2Color || "",
      h3,
      h3Color: h3Color || "",
      link: linkData,
      picture: req.optimizedImagePath,
      status: status ?? true,
    };

    let home = await Home.findOne();
    if (!home) {
      return next({ message: "Home document not found.", status: 404 });
    }

    const slideIndex = home.mainCorousel.findIndex(
      (slide) => slide._id.toString() === _id
    );

    if (slideIndex === -1) {
      return next({ message: "Slide not found.", status: 404 });
    }

    if (req.optimizedImagePath) {
      newSlideData["picture"] = req.optimizedImagePath;
      await unlinkAsync(home.mainCorousel[slideIndex].picture);
    } else {
      newSlideData["picture"] = pictures;
    }

    Object.assign(home.mainCorousel[slideIndex], newSlideData);

    const updatedHome = await home.save();

    req.successResponse = {
      message: "New slide updated successfully!",
      data: updatedHome.mainCorousel,
    };
    return next();
  } catch (error) {
    return next({ status: 500, message: "Internal server error." });
  }
};

module.exports = {
  getHomeData,
  updateHomeBanner,
  addHomeSlide,
  deleteHomeSlide,
  updateHomeSlider,
};
