import { Router } from "express";
const routes = Router();
import * as publicCtrl from "../controllers/public-controller.js";
import isHuman, { rateLimiter } from "../middleware/public-api.js";
import blogRoutes from "./public/blogs.js";

routes.get("/test", (req, res) => {
  res.send("App is up and running ");
});

routes.get("/plants/:category_slug", publicCtrl.getCatProducts);

routes.get("/master-data", publicCtrl.getMasterData);

routes.get("/plant-slug/:slug", publicCtrl.getPlantDetailsBySlug);

routes.get("/plant-ID/:id", publicCtrl.getPlantDetailsByID);

routes.post(
  "/order-enquiry",
  isHuman,
  rateLimiter,
  publicCtrl.createOrderEnquiry
);
routes.post(
  "/contact-us",
  isHuman,
  rateLimiter,
  publicCtrl.createContactEnquiry
);
routes.post("/subscriptions", isHuman, rateLimiter, publicCtrl.subscribeEmail);

routes.use("/blogs", blogRoutes);

export default routes;
