import { CircProductConfiguration } from "@entity/CircProductConfiguration";
import { Product } from "@entity/Product";
import { ProductConfiguration } from "@entity/ProductConfiguration";
import { RectProductConfiguration } from "@entity/RectProductConfiguration";
import { Field, InputType } from "type-graphql";

@InputType()
export class CreateProductInput implements Partial<Product> {
  @Field()
  basePrice: number;

  @Field()
  name: string;

  @Field(() => [RectProductConfigurationInput], { nullable: true })
  rectConfigs?: RectProductConfigurationInput[];

  @Field(() => [CircProductConfigurationInput], { nullable: true })
  circConfigs?: CircProductConfigurationInput[];
}

@InputType()
class ProductConfigurationInput implements Partial<ProductConfiguration> {
  @Field()
  depth: number;

  @Field()
  db1: number;

  @Field()
  db2: number;

  @Field()
  db5: number;

  @Field()
  db10: number;
}

@InputType()
class CircProductConfigurationInput
  extends ProductConfigurationInput
  implements Partial<CircProductConfiguration> {
  @Field()
  diameter: number;
}

@InputType()
class RectProductConfigurationInput
  extends ProductConfigurationInput
  implements Partial<RectProductConfiguration> {
  @Field()
  width: number;

  @Field()
  height: number;

  @Field()
  thickness: number;
}
