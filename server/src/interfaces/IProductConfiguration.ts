import { Field, InterfaceType } from "type-graphql";
import { PrimaryGeneratedColumn, Column } from "typeorm";

@InterfaceType()
export abstract class IProductConfiguration {
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

  @Field()
  surface(): number {
    throw new Error("Method not implemented!");
  }
}
