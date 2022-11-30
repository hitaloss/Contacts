import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { IClientRequest } from "../../interfaces/client";
import { hash } from "bcrypt";

async function clientCreateService({
  fullName,
  email,
  password,
  phone,
}: IClientRequest): Promise<Client> {
  const clientRepository = AppDataSource.getRepository(Client);

  const newClient = clientRepository.create({
    fullName,
    email,
    password: await hash(password, 10),
    phone,
  });

  await clientRepository.save(newClient);
  return newClient;
}

export default clientCreateService;
