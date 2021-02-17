import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { IProductConfiguration } from "../interfaces/IProductConfiguration";
import { Product } from "./Product";

@Entity()
@ObjectType({ implements: IProductConfiguration })
export class CircProductConfiguration extends IProductConfiguration {
  @Column("double precision")
  @Field()
  diameter: number;

  @ManyToOne(() => Product, (product) => product.circConfigurations, {
    lazy: true,
  })
  product: Product;

  surface() {
    return Math.PI * Math.pow(this.diameter / 2, 2);
  }
}
