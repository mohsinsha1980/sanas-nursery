import { Router } from "express";
import * as settingsCtrl from "../../controllers/admin/master-data.js";
const routes = Router();

// /api/admin/master-data

routes.get("/", settingsCtrl.getMasterData);
// routes.post("/", masterDataCtrl.addMasterData);
// routes.delete("/:field/:id", masterDataCtrl.deleteMasterRecord);
// routes.post("/address", masterDataCtrl.addAdminAddress);

export default routes;
