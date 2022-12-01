import { Router } from "express";
import sessionController from "../controllers/session/session.controller";

const routes = Router();
export function contactsRouters() {
  routes.post("", sessionController);
  return routes;
}
