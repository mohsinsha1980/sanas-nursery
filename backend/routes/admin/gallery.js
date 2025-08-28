const express = require("express");
const routes = express.Router();
const galleryCtrl = require("../../controllers/admin/gallery");
const { mediaUpload } = require("../../middleware/multer-upload");

// /api/admin/gallery

routes.post("/", mediaUpload(MEDIA.Gallery), galleryCtrl.addImages);
routes.get("/", galleryCtrl.getImages);
routes.delete("/:_id", galleryCtrl.deleteImage);

module.exports = routes;