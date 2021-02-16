import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RoleEnum {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn({ type: "bigint" })
  _id: number;

  @Column()
  name: string;
}
