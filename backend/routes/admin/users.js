import { Router } from "express";
import * as userCtrl from "../../controllers/admin/users.js";
const routes = Router();

// /api/admin/users
routes.get("/", userCtrl.getUsers);

export default routes;
