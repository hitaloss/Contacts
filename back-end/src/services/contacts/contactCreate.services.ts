import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { IContactRequest } from "../../interfaces/contact";

async function contactCreateService({
  fullName,
  email,
  phone,
}: IContactRequest): Promise<Contact> {
  const contactRepository = AppDataSource.getRepository(Contact);

  const newContact = contactRepository.create({
    fullName,
    email,
    phone,
  });

  await contactRepository.save(newContact);
  return newContact;
}

export default contactCreateService;
