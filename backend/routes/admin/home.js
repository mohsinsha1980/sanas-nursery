import express from "express";
import * as homeCtrl from "../../controllers/admin/home.js";
import { MEDIA } from "../../lib/constants.js";
import mediaUpload from "../../middleware/multer-upload.js";
const routes = express.Router();

routes.put("/green-choices", homeCtrl.updateGreenChoices);
routes.get("/", homeCtrl.getHomeData);
routes.put("/cards", mediaUpload(MEDIA.Home.Cards), homeCtrl.updateHomeCard);
routes.put(
  "/gallery",
  mediaUpload(MEDIA.Home.Gallery),
  homeCtrl.updateHomeGallery
);

routes.put("/videos", homeCtrl.updateHomeVideos);

export default routes;
