import { Router } from "express";
import * as publicCtrl from "../controllers/public-controller.js";
import {
  getBlogBySlug,
  getPublishedBlogs,
  getRelatedBlogs,
} from "../controllers/public/blogs.js";
import isHuman, { rateLimiter } from "../middleware/public-api.js";
const routes = Router();

routes.get("/test", (req, res) => {
  res.send("App is up and running ");
});

routes.get("/plants", publicCtrl.getAllPlants);
routes.get("/plants/:category_slug", publicCtrl.getCatProducts);

routes.get("/master-data", publicCtrl.getMasterData);

routes.get("/home", publicCtrl.getPublicHomeData);

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

routes.get("/blogs/", getPublishedBlogs);
routes.get("/blogs/:slug", getBlogBySlug);
routes.get("/blogs/related/:blogId", getRelatedBlogs);

routes.get("/global-search-opt", publicCtrl.getGlobalSearchOpt);

export default routes;
