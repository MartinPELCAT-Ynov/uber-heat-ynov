import { Field, InterfaceType } from "type-graphql";
import { PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { IProductConfiguration } from "../interfaces/IProductConfiguration";

@InterfaceType()
export abstract class ProductConfiguration
  extends BaseEntity
  implements IProductConfiguration {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column("double precision")
  @Field()
  depth: number;

  @Column("double precision")
  @Field()
  db1: number;

  @Column("double precision")
  @Field()
  db2: number;

  @Column("double precision")
  @Field()
  db5: number;

  @Column("double precision")
  @Field()
  db10: number;

  @Field(() => Number)
  surface(): number {
    throw new Error("Method not implemented!");
  }
}
