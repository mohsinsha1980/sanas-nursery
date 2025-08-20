import { Router } from "express";
const routes = Router();

routes.get("/test", (req, res) => {
  res.send("App is up and running ");
});

export default routes;
