import { Router } from "express";
const routes = Router();
import * as publicCtrl from "../controllers/public-controller.js";

routes.get("/test", (req, res) => {
  res.send("App is up and running ");
});

routes.get("/plants/:category_slug", publicCtrl.getCatProducts);

routes.get("/master-data", publicCtrl.getMasterData);

routes.get("/plant-slug/:slug", publicCtrl.getPlantDetailsBySlug);

routes.get("/plant-ID/:id", publicCtrl.getPlantDetailsByID);

export default routes;
