import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Product } from "./Product";
import { ProductConfiguration } from "./ProductConfiguration";

@Entity()
@ObjectType({ implements: ProductConfiguration })
@Unique(["depth", "db1", "db2", "db5", "db10", "diameter", "product"])
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
