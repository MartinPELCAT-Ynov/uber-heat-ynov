import { ProductConfiguration } from "apollo/__generated__";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Lazy } from "../types/types";
import { Project } from "./Project";

@Entity()
@ObjectType()
export class Result extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @ManyToOne(() => Project)
  @Field(() => Project)
  project: Lazy<Project>;

  configuration: Lazy<ProductConfiguration>;
}
