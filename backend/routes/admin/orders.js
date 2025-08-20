const express = require("express");
const routes = express.Router();
const ordersCtrl = require("../../controllers/admin/orders");

// /api/admin/orders

routes.get("/", ordersCtrl.getOrders);
routes.get("/:orderId", ordersCtrl.getOrderById);
routes.put("/cancelOrder", ordersCtrl.cancelOrder);
routes.put("/refundOrder", ordersCtrl.refundOrder);
routes.get("/downloadBill/:order_id", ordersCtrl.downloadBill);

module.exports = routes;
