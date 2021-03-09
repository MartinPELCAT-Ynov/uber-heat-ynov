import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Lazy } from "../types/types";
import { Result } from "./Result";
import { User } from "./User";

@Entity()
@ObjectType()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @ManyToOne(() => User, (user) => user.projects, { lazy: true })
  @Field(() => User)
  user: Lazy<User>;

  @OneToMany(() => Result, (result) => result.project, { lazy: true })
  @Field(() => [Result])
  results: Lazy<Result[]>;
}
