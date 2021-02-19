import { hash } from "bcrypt";
import { IsEmail } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BeforeInsert,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Lazy } from "../types/types";
import { Project } from "./Project";
import { UserRole } from "../enums/UserRole";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id?: string;

  @Column()
  @Field()
  name!: string;

  @Column()
  @Field()
  firstName!: string;

  @Column({ unique: true })
  @IsEmail()
  @Field()
  email!: string;

  @Column({ nullable: true })
  @Field()
  company?: string;

  @Column("bool", { default: true })
  @Field()
  locked!: boolean;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  @Field(() => [String])
  role?: UserRole;

  @Column()
  password!: string;

  @OneToMany(() => Project, (project) => project.user, { lazy: true })
  @Field(() => [Project])
  projects: Lazy<Project[]>;

  @BeforeInsert()
  async beforeInset() {
    const { password } = this;
    this.password = await hash(password, 4);
  }
}
