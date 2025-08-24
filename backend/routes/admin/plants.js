import { Router } from "express";
import {
  createPlant,
  deletePlant,
  getPlantById,
  getPlants,
  updatePlant,
} from "../../controllers/admin/plants.js";
import { MEDIA } from "../../lib/constants.js";
import mediaUpload from "../../middleware/multer-upload.js";
const routes = Router();
// /api/admin/products

routes.get("/", getPlants);
routes.post("/", mediaUpload(MEDIA.Plants), createPlant);
routes.get("/:plantId", getPlantById);
routes.put("/:plantId", mediaUpload(MEDIA.Plants), updatePlant);
routes.delete("/:plantId", deletePlant);

export default routes;
