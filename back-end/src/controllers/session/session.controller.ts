import sessionService from "../../services/session/session.services";
import { ISessionCreate } from "../../interfaces/session";
import { Request, Response } from "express";

async function sessionController(request: Request, response: Response) {
  const { email, password }: ISessionCreate = request.body;

  const session = await sessionService({ email, password });

  return response.json({ statusCode: 200, message: "Success", token: session });
}

export default sessionController;
