import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Contact } from "./contact.entity";

@Entity("client")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 128 })
  fullName: string;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({ length: 300 })
  @Exclude()
  password: string;

  @Column({ length: 15 })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Contact, (contact) => contact.client)
  contacts: Contact[];

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
