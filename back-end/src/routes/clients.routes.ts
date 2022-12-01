import { Router } from "express";
import clientCreateController from "../controllers/clients/clientCreate.controller";
import clientDeleteController from "../controllers/clients/clientDelete.controller";
import clientReadController from "../controllers/clients/clientRead.controller";
import clientUpdateController from "../controllers/clients/clientUpdate.controller";
import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();
export function clientRouters() {
  routes.post("", clientCreateController);
  routes.get("", clientReadController);
  routes.patch("", authMiddleware, clientUpdateController);
  routes.delete("", authMiddleware, clientDeleteController);
  return routes;
}
