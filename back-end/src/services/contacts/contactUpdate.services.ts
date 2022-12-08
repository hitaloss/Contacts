import { v4 } from "uuid";
import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";
import { IContactUpdate } from "../../interfaces/contact";
import { validate as uuidValidate } from "uuid";

async function contactUpdateService(
  clientId: string,
  contactId: string,
  { email, fullName, phone }: IContactUpdate
): Promise<Contact> {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  if (!uuidValidate(contactId)) throw new AppError(400, "Invalid uuid param.");

  const client = await clientRepository.findOneBy({ id: clientId });
  if (!client) throw new AppError(404, "Client not found.");

  const contact = await contactRepository.findOne({
    where: {
      id: contactId,
      client: {
        id: client.id,
      },
    },
  });
  if (!contact) throw new AppError(404, "Contact not found.");

  await contactRepository.update(contact.id, {
    email: email ? email : contact.email,
    fullName: fullName ? fullName : contact.fullName,
    phone: phone ? phone : contact.phone,
  });

  const contactReturn = await contactRepository.findOneBy({ id: contact.id });

  return contactReturn!;
}

export default contactUpdateService;
