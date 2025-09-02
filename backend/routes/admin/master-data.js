import { Router } from "express";
import * as settingsCtrl from "../../controllers/admin/master-data.js";
const routes = Router();

// /api/admin/master-data

routes.get("/", settingsCtrl.getMasterData);
routes.post("/", settingsCtrl.addMasterData);
routes.delete("/:field/:id", settingsCtrl.deleteMasterRecord);
// routes.post("/address", masterDataCtrl.addAdminAddress);

export default routes;
