import { errorMiddleware } from "./middlewares/error.middleware";
import { Request, Response } from "express";
import "express-async-errors";
import { appRoutes } from "./routes";
import express from "express";

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

appRoutes(app);

app.get("", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Contacts API",
  });
});

app.use(errorMiddleware);

app.listen(3001);
