import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";
import { validate as uuidValidate } from "uuid";

async function contactDeleteService(
  contactId: string,
  clientId: string
): Promise<string> {
  const contactRepository = AppDataSource.getRepository(Contact);
  const clientRepository = AppDataSource.getRepository(Client);
  if (!uuidValidate(contactId)) throw new AppError(400, "Invalid uuid param.");

  const client = await clientRepository.findOneBy({ id: clientId });
  if (!client) throw new AppError(404, "Client not found.");

  const contact = await contactRepository.findOne({
    where: {
      id: contactId,
      client: {
        id: clientId,
      },
    },
  });
  if (!contact) throw new AppError(404, "Contact not found.");

  await contactRepository.delete(contact.id);
  return "Contact deleted with success.";
}

export default contactDeleteService;
