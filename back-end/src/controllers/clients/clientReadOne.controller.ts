import { Request, Response } from "express";
import clientReadOneService from "../../services/clients/clientReadOne.services";

async function clientReadOneController(request: Request, response: Response) {
  const clientId: string = request.client.clientId;

  const client = await clientReadOneService(clientId);

  return response.json({ statusCode: 200, message: "Success", client: client });
}

export default clientReadOneController;
