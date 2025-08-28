import { Router } from "express";
const routes = Router();
import * as userCtrl from "../../controllers/admin/users.js";

// /api/admin/users

routes.get("/", userCtrl.getUsers);
// routes.post("/", userCtrl.createUser);
// routes.get("/:id", userCtrl.getUser);
// routes.put("/:id", userCtrl.updateUser);
// routes.delete("/:id", userCtrl.deleteUser);

export default routes;
