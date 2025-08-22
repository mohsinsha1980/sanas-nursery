const express = require("express");
const routes = express.Router();
const productCtrl = require("../../controllers/admin/products");
const { mediaUpload } = require("../../middleware/multer-upload");
const { MEDIA } = require("../../lib/constants");

// /api/admin/products

routes.get("/", productCtrl.getProducts);
routes.post("/", mediaUpload(MEDIA.Product), productCtrl.createProduct);
routes.get("/:productId", productCtrl.getProductById);
routes.put(
  "/:productId",
  mediaUpload(MEDIA.Product),
  productCtrl.updateProduct
);
routes.delete("/:productId", productCtrl.deleteProduct);

module.exports = routes;
