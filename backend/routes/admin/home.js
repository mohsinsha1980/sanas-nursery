const express = require("express");
const routes = express.Router();
const homeCtrl = require("../../controllers/admin/home");
const { MEDIA } = require("../../lib/constants");
const { mediaUpload } = require("../../middleware/multer-upload");

routes.post(
  "/updateHomeBanner",
  mediaUpload(MEDIA.Home.Banner),
  homeCtrl.updateHomeBanner
);

routes.get("/", homeCtrl.getHomeData);

routes.post(
  "/addHomeSlide",
  mediaUpload(MEDIA.Home.Slider),
  homeCtrl.addHomeSlide
);

routes.delete("/deleteHomeSlide/:_id", homeCtrl.deleteHomeSlide);

routes.post(
  "/updateHomeSlider",
  mediaUpload(MEDIA.Home.Slider),
  homeCtrl.updateHomeSlider
);

module.exports = routes;
