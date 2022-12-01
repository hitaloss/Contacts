import { Express } from "express";
import { clientRouters } from "./clients.routes";
import { sessionRouters } from "./session.routes";

export const appRoutes = (app: Express) => {
  app.use("/clients", clientRouters());
  app.use("/session", sessionRouters());
};
