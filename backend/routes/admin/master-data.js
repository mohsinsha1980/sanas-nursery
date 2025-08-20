const express = require("express");
const routes = express.Router();
const masterDataCtrl = require("../../controllers/admin/master-data");

// /api/admin/master-data

routes.get("/", masterDataCtrl.getMasterData);
routes.post("/", masterDataCtrl.addMasterData);
routes.delete("/:field/:id", masterDataCtrl.deleteMasterRecord);
routes.post("/address", masterDataCtrl.addAdminAddress);

module.exports = routes;
