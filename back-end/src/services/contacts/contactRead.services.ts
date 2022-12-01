import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/appError";

async function contactReadService(clientId: string): Promise<Contact[]> {
  const contactsRepository = AppDataSource.getRepository(Contact);
  const clientsRepository = AppDataSource.getRepository(Client);

  const client = await clientsRepository.findOneBy({ id: clientId });
  if (!client) throw new AppError(404, "Client not found.");

  const contacts = await contactsRepository.find({
    where: {
      client: {
        id: client.id,
      },
    },
  });
  if (!contacts) return [];

  return contacts;
}

export default contactReadService;
