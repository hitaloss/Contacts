import contactReadService from "../../services/contacts/contactRead.services";
import { Request, Response } from "express";

async function contactReadController(request: Request, response: Response) {
  const clientId: string = request.client.clientId;

  const clientContacts = await contactReadService(clientId);

  return response.json({
    statusCode: 200,
    message: "Success",
    contacts: clientContacts,
  });
}

export default contactReadController;
