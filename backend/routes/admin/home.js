import express from "express";
import * as homeCtrl from "../../controllers/admin/home.js"; // add .js extension in ESM
const routes = express.Router();

routes.put("/green-choices", homeCtrl.updateGreenChoices);
routes.get("/", homeCtrl.getHomeData);
routes.put("/cards", homeCtrl.updateHomeCard);

// routes.post(
//   "/addHomeSlide",
//   mediaUpload(MEDIA.Home.Slider),
//   homeCtrl.addHomeSlide
// );

// routes.delete("/deleteHomeSlide/:_id", homeCtrl.deleteHomeSlide);

// routes.post(
//   "/updateHomeSlider",
//   mediaUpload(MEDIA.Home.Slider),
//   homeCtrl.updateHomeSlider
// );

export default routes;
