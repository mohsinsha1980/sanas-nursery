import { Router } from "express";
import { getSubscription } from "../../controllers/admin/subscription.js";

const routes = Router();

routes.get("/", getSubscription);

export default routes;