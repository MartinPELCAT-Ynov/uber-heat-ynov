import { CircProductConfiguration } from "@entity/CircProductConfiguration";
import { Product } from "@entity/Product";
import { RectProductConfiguration } from "@entity/RectProductConfiguration";
import { FieldResolver, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { ProductConfigurationUnion } from "../unions/ProductConfigurationUnion";

@Service()
@Resolver(() => Product)
export class ProductResolver {
  @Query(() => [Product])
  async products() {
    return Product.find();
  }

  @FieldResolver(() => [ProductConfigurationUnion])
  async configurations() {
    const circProducts = await CircProductConfiguration.find();
    const rectProducts = await RectProductConfiguration.find();
    return [...circProducts, ...rectProducts];
  }
}
