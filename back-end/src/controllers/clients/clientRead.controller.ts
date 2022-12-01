import clientReadService from "../../services/clients/clientRead.services";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";

async function clientReadController(request: Request, response: Response) {
  const clients = await clientReadService();
  return response.json({
    statusCode: 200,
    message: "Success",
    clients: instanceToPlain(clients),
  });
}

export default clientReadController;
