import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/appError";

async function clientDeleteService(id: string): Promise<string> {
  const clientRepository = AppDataSource.getRepository(Client);

  const clientDeleted = await clientRepository.findOneBy({ id });

  if (!clientDeleted) throw new AppError(404, "Client not found.");

  await clientRepository.delete(clientDeleted.id);

  return "Client deleted with success";
}

export default clientDeleteService;
