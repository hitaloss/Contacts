import contactDeleteService from "../../services/contacts/contactDelete.services";
import { Request, Response } from "express";

async function contactDeleteController(request: Request, response: Response) {
  const clientId: string = request.client.clientId;
  const contactId: string = request.params.id;

  const contactDeleted = await contactDeleteService(contactId, clientId);

  return response
    .status(204)
    .json({ statusCode: 204, message: "Success", contact: contactDeleted });
}

export default contactDeleteController;
