import contactCreateService from "../../services/contacts/contactCreate.services";
import { Request, Response } from "express";
import { IContactRequest } from "../../interfaces/contact";

async function contactCreateController(request: Request, response: Response) {
  const { fullName, email, phone }: IContactRequest = request.body;

  const newContact = await contactCreateService({ fullName, email, phone });

  return response
    .status(201)
    .json({ statusCode: 201, message: "Success", contact: newContact });
}

export default contactCreateController;
