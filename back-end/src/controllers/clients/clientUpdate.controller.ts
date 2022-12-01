import clientUpdateService from "../../services/clients/clientUpdate.services";
import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IClientUpdate } from "../../interfaces/client";

async function clientUpdateController(request: Request, response: Response) {
  const { fullName, phone, password }: IClientUpdate = request.body;

  const id: string = request.client.clientId;

  const clientUpdated = await clientUpdateService(id, {
    fullName,
    phone,
    password,
  });

  return response.json({
    statusCode: 200,
    message: "Success",
    client: instanceToPlain(clientUpdated),
  });
}

export default clientUpdateController;
