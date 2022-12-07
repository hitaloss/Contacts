import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { IClientRequest } from "../../interfaces/client";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

async function clientCreateService({
  fullName,
  email,
  password,
  phone,
}: IClientRequest): Promise<Client> {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      email: email,
    },
  });
  if (client) throw new AppError(403, "This email already exists");

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
