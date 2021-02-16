import { ObjectType } from "type-graphql";
import { Entity } from "typeorm";

@Entity()
@ObjectType()
export class Subject {}
