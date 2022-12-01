import { AppDataSource } from "../../data-source";
import { Client } from "../../entities/clients.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { compare } from "bcrypt";
import { ISessionCreate } from "../../interfaces/session";

async function sessionService({
  email,
  password,
}: ISessionCreate): Promise<string> {
  const clientRepository = AppDataSource.getRepository(Client);

  const client = await clientRepository.findOne({
    where: {
      email: email,
    },
  });

  if (!client) throw new AppError(403, "Invalid email or password");

  const match = await compare(password, client.password);
  if (!match) throw new AppError(403, "Invalid email or password");

  const token = jwt.sign(
    { email: client.email },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "3h",
      subject: client.id,
    }
  );

  return token;
}

export default sessionService;
