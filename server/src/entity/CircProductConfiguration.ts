import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { ProductConfiguration } from "./ProductConfiguration";

@Entity()
@ObjectType({ implements: ProductConfiguration })
export class CircProductConfiguration extends ProductConfiguration {
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
