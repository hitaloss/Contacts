import contactUpdateService from "../../services/contacts/contactUpdate.services";
import { Request, Response } from "express";
import { IContactUpdate } from "../../interfaces/contact";

async function contactUpdateController(request: Request, response: Response) {
  const clientId: string = request.client.clientId;
  const contactId: string = request.params.id;
  const { email, fullName, phone }: IContactUpdate = request.body;

  const contactUpdated = await contactUpdateService(clientId, contactId, {
    email,
    fullName,
    phone,
  });

  return response.json({
    statusCode: 200,
    message: "Success",
    contact: contactUpdated,
  });
}

export default contactUpdateController;
