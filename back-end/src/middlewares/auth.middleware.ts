import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  let token = request.headers.authorization;
  if (!token) throw new AppError(403, "Missing authorization headers");
  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) throw new AppError(403, "Invalid token");
      if (request.client.clientId && request.client.clientId !== decoded.sub) {
        throw new AppError(401, "You do not have permission for this action.");
      }

      request.client = {
        clientId: decoded.sub,
      };

      next();
    }
  );
}

export default authMiddleware;
