import { Router } from "express";
import sessionController from "../controllers/session/session.controller";

const routes = Router();
export function sessionRouters() {
  routes.post("", sessionController);
  return routes;
}
