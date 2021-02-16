import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToMany } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";
import { User } from "./User";

@Entity()
@ObjectType()
export class Group extends AbstractBaseEntity {
  @Field()
  @Column()
  name: string;

  @Field(() => [User])
  @ManyToMany(() => User)
  users: User[];
}
