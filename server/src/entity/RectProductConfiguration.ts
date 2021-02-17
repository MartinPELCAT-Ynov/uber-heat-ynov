import { Field, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne } from "typeorm";
import { IProductConfiguration } from "../interfaces/IProductConfiguration";
import { Product } from "./Product";

@ObjectType({ implements: IProductConfiguration })
@Entity()
export class RectProductConfiguration extends IProductConfiguration {
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
