import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Product } from "./Product";
import { ProductConfiguration } from "./ProductConfiguration";

@ObjectType({ implements: ProductConfiguration })
@Entity()
@Unique([
  "depth",
  "db1",
  "db2",
  "db5",
  "db10",
  "width",
  "height",
  "thickness",
  "product",
])
export class RectProductConfiguration extends ProductConfiguration {
  @Column("double precision")
  @Field()
  width: number;

  @Column("double precision")
  @Field()
  height: number;

  @Column("double precision")
  @Field()
  thickness: number;

  @ManyToOne(() => Product, (product) => product.rectConfigurations, {
    lazy: true,
  })
  product: Product;

  surface() {
    return this.width * this.height;
  }
}
