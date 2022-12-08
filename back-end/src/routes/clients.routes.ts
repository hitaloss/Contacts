import { Router } from "express";
import clientCreateController from "../controllers/clients/clientCreate.controller";
import clientDeleteController from "../controllers/clients/clientDelete.controller";
import clientReadController from "../controllers/clients/clientRead.controller";
import clientReadOneController from "../controllers/clients/clientReadOne.controller";
import clientUpdateController from "../controllers/clients/clientUpdate.controller";
import authMiddleware from "../middlewares/auth.middleware";

const routes = Router();
export function clientRouters() {
  routes.post("", clientCreateController);
  routes.get("", clientReadController);
  routes.get("/myaccount", authMiddleware, clientReadOneController);
  routes.patch("", authMiddleware, clientUpdateController);
  routes.delete("", authMiddleware, clientDeleteController);
  return routes;
}
