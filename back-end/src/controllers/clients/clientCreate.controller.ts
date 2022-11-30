import { Request, Response } from "express";
import clientCreateService from "../../services/clients/clientCreate.services";
import { instanceToPlain } from "class-transformer";

async function clientCreateController(request: Request, response: Response) {
  const { fullName, email, password, phone } = request.body;

  const newClient = await clientCreateService({
    fullName,
    email,
    password,
    phone,
  });

  return response.status(201).json(instanceToPlain(newClient));
}

export default clientCreateController;
