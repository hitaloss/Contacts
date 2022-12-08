import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";

async function clientReadService(): Promise<Client[]> {
  const clientRepository = AppDataSource.getRepository(Client);

  const clients = await clientRepository.find();

  return clients;
}

export default clientReadService;
