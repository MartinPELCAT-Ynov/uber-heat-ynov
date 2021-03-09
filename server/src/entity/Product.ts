import { Field, ObjectType } from "type-graphql";
import {
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
} from "typeorm";
import { Lazy } from "../types/types";
import { CircProductConfiguration } from "./CircProductConfiguration";
import { RectProductConfiguration } from "./RectProductConfiguration";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name!: string;

  @Column("double precision")
  @Field()
  basePrice!: number;

  @OneToMany(() => RectProductConfiguration, (prodC) => prodC.product, {
    lazy: true,
    cascade: ["insert"],
  })
  rectConfigurations: Lazy<RectProductConfiguration[]>;

  @OneToMany(() => CircProductConfiguration, (prodC) => prodC.product, {
    lazy: true,
    cascade: ["insert"],
  })
  circConfigurations: Lazy<CircProductConfiguration[]>;
}
