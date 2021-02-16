import { Field, ObjectType } from "type-graphql";
import { Column, Entity } from "typeorm";
import AbstractBaseEntity from "./AbstractBaseEntity";

@Entity()
@ObjectType()
export class Room extends AbstractBaseEntity {
  @Column({ type: "varchar" })
  @Field(() => String)
  name: string;
}
