const express = require("express");
const router = express.Router();
const orderCtrl = require("../../controllers/user/order");

router.get("/", orderCtrl.getUserOrders);
router.get("/download", orderCtrl.downloadBill);
router.get("/:orderId", orderCtrl.getOrderById);

module.exports = router;
