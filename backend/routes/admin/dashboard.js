const express = require("express");
const routes = express.Router();
const dashboardCtrl = require("../../controllers/admin/dashboard");

// /api/admin/dashboard

routes.get("/dashboard_stats", dashboardCtrl.getDashboardStats);
routes.get("/orders_stats", dashboardCtrl.getOrdersStats);
routes.get("/top_selling_product", dashboardCtrl.topSellingProducts);
routes.get("/inventory_report", dashboardCtrl.getInventoryReport);

module.exports = routes;
