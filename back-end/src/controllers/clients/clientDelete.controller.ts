import clientDeleteService from "../../services/clients/clientDelete.services";
import { Request, Response } from "express";

async function clientDeleteController(request: Request, response: Response) {
  const id = request.client.clientId;

  const clientDeleted = await clientDeleteService(id);

  return response
    .status(204)
    .json({ statusCode: 204, message: "Success", client: clientDeleted });
}

export default clientDeleteController;
