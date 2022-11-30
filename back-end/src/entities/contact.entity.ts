import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./clients.entity";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 128 })
  fullName: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @ManyToOne(() => Client, (client) => client.contacts)
  client: Client;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
