import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";
import { IContactRequest } from "../../interfaces/contact";

async function contactCreateService({
  fullName,
  email,
  phone,
  clientId,
}: IContactRequest): Promise<Contact> {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id: clientId });
  if (!client) throw new AppError(404, "Client not found.");

  const newContact = contactRepository.create({
    fullName,
    email,
    phone,
    client: client,
  });

  await contactRepository.save(newContact);
  return newContact;
}

export default contactCreateService;
