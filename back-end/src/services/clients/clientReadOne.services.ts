import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/appError";

async function clientReadOneService(cliendId: string): Promise<Client> {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOneBy({ id: cliendId });
  if (!client) throw new AppError(404, "Client not found.");

  return client;
}

export default clientReadOneService;
