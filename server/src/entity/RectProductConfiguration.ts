import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { ProductConfiguration } from "./ProductConfiguration";

@ObjectType({ implements: ProductConfiguration })
@Entity()
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

  @Field()
  getSurface(): number {
    return this.width * this.height;
  }
}
