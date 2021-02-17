import { Field, ObjectType } from "type-graphql";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Result {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Field()
  project: string;

  @Field()
  configuration: string;
}
