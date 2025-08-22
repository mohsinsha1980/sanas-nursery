const express = require("express");
const routes = express.Router();
const userCartCtrl = require("../../controllers/user/carts");

// /api/user/carts

routes.post("/", userCartCtrl.addProductToCart);
routes.get("/", userCartCtrl.getCartProducts);
routes.delete("/:itemId", userCartCtrl.removeFromCart);

module.exports = routes;
