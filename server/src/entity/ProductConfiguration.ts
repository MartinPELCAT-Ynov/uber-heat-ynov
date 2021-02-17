import { Field, InterfaceType } from "type-graphql";
import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

@InterfaceType()
export abstract class ProductConfiguration extends BaseEntity {
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

  abstract getSurface(): number;
}
