import { hash } from "bcrypt";
import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  ManyToMany,
  Index,
  BeforeInsert,
  JoinTable,
} from "typeorm";
import { Lazy } from "../types/types";
import AbstractBaseEntity from "./AbstractBaseEntity";
import { Group } from "./Group";
import { Role } from "./UseRole";

@Entity()
@ObjectType({ description: "General database" })
export class User extends AbstractBaseEntity {
  @Column()
  @Field()
  firstName!: string;

  @Column()
  @Field()
  lastName!: string;

  @Column({ unique: true })
  @Index()
  @Field()
  username!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Role, { lazy: true })
  @JoinTable()
  @Field(() => [String], { nullable: true })
  roles?: Lazy<Role[]>;

  @ManyToMany(() => Group)
  groups: Group[];

  @BeforeInsert()
  async beforeInset() {
    const { password } = this;

    this.password = await hash(password, 4);
  }
}
